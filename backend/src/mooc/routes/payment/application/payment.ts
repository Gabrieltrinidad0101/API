import { isEmptyNullOrUndefined } from '../../../../../../share/application/isEmptyNullUndefiner'
import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type IBasicUser, type TypeRol } from '../../../../../../share/domain/user'
import { Logs } from '../../../../logs'
import { type ISubscriptionEmail } from '../../../emailSubscription/domian/emailSubscription'
import { getScreenId } from '../../../share/application/getScreenId'
import { type IConstantes } from '../../../share/domain/constantes'
import { type IHttpRequest } from '../../../share/domain/httpRequest'
import { type TypeValidation } from '../../../share/domain/Validator'
import type IWhatsAppController from '../../../whatsAppControl/domian/whatsAppController'
import type IInstanceRepository from '../../instance/domian/InstanceRepository'
import type IUserRepository from '../../user/domain/IUserRepository'
import { type IPaymentRepository, type ISubscription, type ISubscriptionFromApi, type IPaymentApp, type ICaptureSubscription } from '../domian/payment'
import { generateObjectSubscription } from './jsonPayment'

export class PaymentApp implements IPaymentApp {
  constructor (
    private readonly httpRequest: IHttpRequest,
    private readonly constantes: IConstantes,
    private readonly paymentRepository: IPaymentRepository,
    private readonly instanceRepository: IInstanceRepository,
    private readonly whatsAppController: IWhatsAppController,
    private readonly paymentSubscriptionValidator: TypeValidation,
    private readonly subscriptionEmail: ISubscriptionEmail,
    private readonly userRepository: IUserRepository
  ) { }

  private readonly makeHttpRequest = async (url: string, subscription: ISubscription | object, method: 'POST' | 'GET' = 'POST'): Promise<any> => {
    const response = await this.httpRequest({
      method,
      url,
      body: subscription,
      auth: {
        user: this.constantes.CLIENT_PAYMENT_ID,
        pass: this.constantes.PAYMENT_SECRET
      }
    })
    return response.body
  }

  generateSubscription = async (user: IBasicUser): Promise<ISubscriptionFromApi> => {
    const subscription = generateObjectSubscription(user)
    return await this.createSubscription(user, subscription)
  }

  createSubscription = async (user: IBasicUser, subscriptionToCreate: ISubscription): Promise<ISubscriptionFromApi> => {
    const { PAYMENT_SUBSCRIPTIONS_URL } = this.constantes
    const subscriptionFromApi = await this.makeHttpRequest(PAYMENT_SUBSCRIPTIONS_URL, subscriptionToCreate) as ISubscriptionFromApi
    const error = this.paymentSubscriptionValidator(subscriptionFromApi)
    if (error !== undefined) {
      throw new Error(`Error creating susbscription api reponse ${JSON.stringify(subscriptionFromApi)} error = ${JSON.stringify(error)}`)
    }
    subscriptionFromApi.userId = user._id
    await this.paymentRepository.saveSubscription(subscriptionFromApi)
    return subscriptionFromApi
  }

  captureSubscription = async (subscriptionId: string): Promise<IHttpStatusCode> => {
    const subscription = await this.paymentRepository.findOneSubscription({ id: subscriptionId })
    if (subscription === null) {
      return {
        statusCode: 404,
        message: 'Subscription not exist'
      }
    }

    if (subscription?.status === 'ACTIVE') {
      return {
        statusCode: 201,
        message: 'Subscription activated'
      }
    }

    const instance = await this.instanceRepository.findOne({ subscriptionId })
    if (isEmptyNullOrUndefined(instance) || instance === null) {
      return {
        statusCode: 404,
        error: 'The subscription do not have any instance',
        message: 'Instance not found'
      }
    }

    const { PAYMENT_SUBSCRIPTIONS_URL } = this.constantes
    const url = `${PAYMENT_SUBSCRIPTIONS_URL}/${subscriptionId}`
    const captureSubscription = await this.makeHttpRequest(url, {}, 'GET') as ICaptureSubscription
    if (captureSubscription.status !== 'ACTIVE') {
      return {
        statusCode: 422,
        error: 'The subscription needs to be active',
        message: 'The subscription is not active'
      }
    }
    const date = new Date()
    const nextMonth = new Date(date.setMonth(date.getMonth() + 1))
    await this.instanceRepository.updateEndService(instance._id, nextMonth)
    await this.instanceRepository.updateStatus({ _id: instance._id }, 'initial')
    await this.paymentRepository.updateStatus(subscription?._id, 'ACTIVE')
    this.whatsAppController.start(instance, 'payment')
      .catch(error => {
        Logs.Exception(error)
      })
    const user = await this.userRepository.findById(instance.userId ?? '')
    if (user === null) {
      Logs.Error(`Instance id = ${instance._id} with null user id ${instance.userId ?? 'undefined'} and name ${instance.userName ?? 'undefined'}`)
    } else {
      await this.subscriptionEmail.send(user)
    }
    return {
      message: 'The instance is initialized successfully'
    }
  }

  get = async (userId: string, userRol: TypeRol): Promise<IHttpStatusCode> => {
    const instances = await this.paymentRepository.findPaymentsWithInstance(userId, userRol)
    return {
      message: instances
    }
  }

  eventsControls = async (body: any): Promise<IHttpStatusCode> => {
    if (body.event_type === 'BILLING.SUBSCRIPTION.CANCELLED') {
      const subscriptionId = body.resource.id
      await this.cancelSubscription(subscriptionId)
    }
    return {
      message: 'ok'
    }
  }

  cancelSubscription = async (subscriptionId: string): Promise<void> => {
    const instance = await this.instanceRepository.findOne({ subscriptionId })
    if (instance === null) {
      Logs.Error(`SubscriptionId ${subscriptionId} with null instance`)
      return
    }
    await this.instanceRepository.updateStatus({ _id: instance._id }, 'unpayment')
    const user = await this.userRepository.findOne({ _id: instance.userId })
    const screenId = getScreenId(instance)
    await this.whatsAppController.destroy(screenId)
    if (isEmptyNullOrUndefined(user) || user === null) {
      Logs.Error(`User is null in cancel subscription ${JSON.stringify(instance)}`)
      return
    }
    const subscriptionFromApi = await this.generateSubscription({
      _id: user._id ?? '',
      email: user.email,
      name: user.name
    })
    await this.instanceRepository.updateSubscriptionId(user._id ?? '', subscriptionFromApi.id)
    await this.instanceRepository.updateEndService(instance._id, undefined)
  }

  reCreateSubscription = async (user: IBasicUser, instanceId: string): Promise<IHttpStatusCode> => {
    if (isEmptyNullOrUndefined(instanceId)) {
      return {
        error: 'instanceId cannot be empty null or undefined',
        message: 'Instance id is required',
        statusCode: 422
      }
    }
    const subscriptionFromApi = await this.generateSubscription(user)
    const subscriptionLink = subscriptionFromApi?.links[0].href ?? ''
    await this.instanceRepository.updateSubscriptionId(instanceId, subscriptionFromApi.id)
    await this.instanceRepository.updateStatus({ _id: instanceId }, 'unpayment')
    await this.paymentRepository.updateInstanceId(subscriptionFromApi.id, instanceId)
    return {
      message: subscriptionLink
    }
  }
}
