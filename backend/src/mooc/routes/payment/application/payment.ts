import { isEmptyNullOrUndefined } from '../../../../../../share/application/isEmptyNullUndefiner'
import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import type IInstance from '../../../../../../share/domain/instance'
import { Logs } from '../../../../logs'
import { type IConstantes } from '../../../share/domain/constantes'
import { type IHttpRequest } from '../../../share/domain/httpRequest'
import { type TypeValidation } from '../../../share/domain/Validator'
import type IWhatsAppController from '../../../whatsAppControl/domian/whatsAppController'
import type IInstanceRepository from '../../instance/domian/InstanceRepository'
import { type IPaymentRepository, type ISubscription, type ISubscriptionFromApi, type IUserSubscriber, type IPaymentApp } from '../domian/payment'
import { generateObjectSubscription } from './jsonPayment'

export class PaymentApp implements IPaymentApp {
  constructor (
    private readonly httpRequest: IHttpRequest,
    private readonly constantes: IConstantes,
    private readonly paymentRepository: IPaymentRepository,
    private readonly instanceRepository: IInstanceRepository,
    private readonly whatsAppController: IWhatsAppController,
    private readonly paymentSubscriptionValidator: TypeValidation
  ) { }

  private readonly makeHttpRequest = async (url: string, productoToCreate: ISubscription | object, method: 'POST' | 'GET' = 'POST'): Promise<any> => {
    const response = await this.httpRequest({
      method,
      url,
      body: productoToCreate,
      auth: {
        user: this.constantes.CLIENT_PAYMENT_ID,
        pass: this.constantes.PAYMENT_SECRET
      }
    })
    return response.body
  }

  generateSubscription = async (userSubscriber: IUserSubscriber): Promise<ISubscriptionFromApi> => {
    const subscription = generateObjectSubscription(userSubscriber)
    return await this.createSubscription(subscription)
  }

  createSubscription = async (subscriptionToCreate: ISubscription): Promise<ISubscriptionFromApi> => {
    const { PAYMENT_PLAN_ID, PAYMENT_SUBSCRIPTIONS_URL } = this.constantes
    subscriptionToCreate.plan_id = PAYMENT_PLAN_ID
    const subscriptionFromApi = await this.makeHttpRequest(PAYMENT_SUBSCRIPTIONS_URL, subscriptionToCreate) as ISubscriptionFromApi
    const error = this.paymentSubscriptionValidator(subscriptionFromApi)
    if (error !== undefined) {
      throw new Error(`Error creating susbscription ${JSON.stringify(error)}`)
    }
    await this.paymentRepository.saveSubscription(subscriptionFromApi)
    return subscriptionFromApi
  }

  captureSubscription = async (subscriptionId: string): Promise<IHttpStatusCode> => {
    const subscription = await this.paymentRepository.findOneSubscription({ id: subscriptionId })
    if (subscription?.status === 'Active') {
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
    const url = `${PAYMENT_SUBSCRIPTIONS_URL}${subscriptionId}`
    const result = await this.makeHttpRequest(url, {}, 'GET')

    if (result.status !== 'active') {
      return {
        statusCode: 422,
        error: 'The subscription needs to be active',
        message: 'The subscription is not active'
      }
    }
    const newInstance: IInstance = { ...instance, status: 'initial' }
    this.whatsAppController.start(newInstance, 'payment')
      .catch(error => {
        Logs.Exception(error)
      })
    return {
      message: 'The instance is initialized successfully'
    }
  }
}
