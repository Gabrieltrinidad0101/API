import { isEmptyNullOrUndefined } from '../../../../../../share/application/isEmptyNullUndefiner'
import { type TypeStatusInstance, type IInstanceQRStatus, type ISearchInstance } from '../../../../../../share/domain/instance'
import type IInstance from '../../../../../../share/domain/instance'
import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import type IInstanceRepository from '../domian/InstanceRepository'
import type IWhatsAppController from '../../../whatsAppControl/domian/whatsAppController'
import type IInstanceContructor from '../domian/instance'
import { getScreenId } from '../../../whatsAppControl/infranstructure/getScreenId'
import { type ISubscriptionFromApi, type IPaymentApp } from '../../payment/domian/payment'
import { type IBasicUser } from '../../../../../../share/domain/user'
import crypto from 'crypto'
import { Logs } from '../../../../logs'

export default class Instance {
  private readonly instanceRepository: IInstanceRepository
  private readonly whatsAppController: IWhatsAppController
  private readonly paymentApp: IPaymentApp

  constructor (
    iInstanceContructor: IInstanceContructor
  ) {
    this.instanceRepository = iInstanceContructor.instanceRepository
    this.whatsAppController = iInstanceContructor.whatsAppController
    this.paymentApp = iInstanceContructor.paymentApp
  }

  private validateSearchHttp (searchHttp: ISearchInstance): boolean {
    return isEmptyNullOrUndefined(searchHttp.skip) ||
      isEmptyNullOrUndefined(searchHttp.limit)
  }

  private readonly generateSubscription = async (user: IBasicUser): Promise<ISubscriptionFromApi> => {
    const response = await this.paymentApp.generateSubscription(user)
    return response
  }

  private readonly createInstance = async (user: IBasicUser): Promise<IInstance> => {
    const instances = await this.instanceRepository.find({ userId: user._id })
    const isFirstInstane = instances.length <= 0
    const subscriptionFromApi = isFirstInstane ? null : await this.generateSubscription(user)
    const date = new Date()
    const endService = isFirstInstane ? new Date(date.setMonth(date.getMonth() + 1)) : undefined
    const messageLimit = isFirstInstane ? 100 : Infinity
    const status: TypeStatusInstance = isFirstInstane ? 'initial' : 'unpayment'
    const instance: IInstance = {
      token: crypto.randomUUID(),
      createdIn: date,
      endService,
      initialDate: date,
      messageLimit,
      paymentLink: subscriptionFromApi?.links[0].href ?? '',
      status,
      userId: user._id,
      name: 'Default',
      userName: user.name,
      _id: '',
      subscriptionId: subscriptionFromApi?.id
    }
    return instance
  }

  async save (user: IBasicUser): Promise<IHttpStatusCode> {
    const instancesUnpayment = await this.instanceRepository.find(
      { status: 'unpayment', userId: user._id }
    )
    if (instancesUnpayment.length > 0) {
      return {
        statusCode: 422,
        error: 'Cannot create an instance with unpaid instances',
        message: 'First it is necessary to pay non-payment of instance'
      }
    }
    const instance = await this.createInstance(user)
    const instanceSaved = await this.instanceRepository.insert(instance)
    if (instanceSaved.status === 'initial') {
      this.whatsAppController.start(instanceSaved, 'start')
        .catch(error => {
          console.log(error)
        })
    }
    return {
      statusCode: 200,
      message: {
        instance: instanceSaved,
        info: 'Instance saved successfully'
      }
    }
  }

  async findById (_id: string, userId: string): Promise<IHttpStatusCode> {
    const Instance = await this.instanceRepository.findByIdAndUserId(_id, userId)
    if (Instance === null) {
      return {
        statusCode: 422,
        error: `Instance ${_id} not found`,
        message: 'Instance not found'
      }
    }
    return {
      statusCode: 200,
      message: Instance
    }
  }

  async get (searchHttp: ISearchInstance, userId: string): Promise<IHttpStatusCode> {
    if (this.validateSearchHttp(searchHttp)) {
      return {
        statusCode: 400,
        message: 'Invalid search'
      }
    }
    const Instance = await this.instanceRepository.get(searchHttp)
    return {
      statusCode: 200,
      message: Instance
    }
  }

  async delete (_id: string, userId: string): Promise<IHttpStatusCode> {
    await this.instanceRepository.delete(_id, userId)
    return {
      statusCode: 200,
      message: 'ok'
    }
  }

  async getQr (_id: string, token: string): Promise<IHttpStatusCode> {
    if (isEmptyNullOrUndefined(token)) {
      return {
        statusCode: 422,
        error: 'Token cannot be empty or undefined ',
        message: 'Invalid instance'
      }
    }

    const screenId = getScreenId({ _id, token })
    const instance = await this.instanceRepository.findByIdAndToken(_id, token)

    if (isEmptyNullOrUndefined(instance, screenId) || instance === null) {
      return {
        statusCode: 422,
        error: 'instance id or token is invalid',
        message: 'Invalid instance'
      }
    }

    // always it try to get the qr and the instance is not active
    // it will try to restart but only do that after one minute
    // because when the instance is initial,it is not active
    this.whatsAppController.getStatus(screenId)
      .then(async (screenStatus): Promise<void> => {
        const timeFromInitialDate = Math.abs(instance.initialDate.getTime() - new Date().getTime())
        const thirtySenconds = 1000 * 30
        if (screenStatus === undefined && timeFromInitialDate > thirtySenconds) {
          await this.whatsAppController.restart(instance)
        }
      })
      .catch(error => {
        Logs.Exception(error)
      })

    const instanceQRStatus: IInstanceQRStatus = {
      qr: instance.qr,
      status: instance.status
    }

    return {
      statusCode: 200,
      message: instanceQRStatus
    }
  }

  async saveWebhookUrl (_id: string, webhookUrl: string): Promise<IHttpStatusCode> {
    if (isEmptyNullOrUndefined(webhookUrl)) {
      return {
        statusCode: 422,
        error: 'Webhook cannot be empty,null or undefined',
        message: 'Invalid webhook'
      }
    }
    await this.instanceRepository.saveWebhookUrl(_id, webhookUrl)
    return {
      statusCode: 200,
      message: 'Save Success'
    }
  }

  async saveName (_id: string, name?: string): Promise<IHttpStatusCode> {
    if (isEmptyNullOrUndefined(name) || name === undefined) {
      return {
        statusCode: 422,
        error: 'Name cannot be empty or undefined',
        message: 'Invalid name'
      }
    }
    await this.instanceRepository.saveName(_id, name)
    return {
      statusCode: 200,
      message: 'Name save success'
    }
  }

  async restart (_id: string, token: string): Promise<IHttpStatusCode> {
    if (isEmptyNullOrUndefined(token)) {
      return {
        statusCode: 422,
        error: 'Token is required'
      }
    }
    const instance = await this.instanceRepository.findByIdAndToken(_id, token)
    if (isEmptyNullOrUndefined(instance) || instance === null) {
      return {
        statusCode: 404,
        error: 'Instance does not exist'
      }
    }

    await this.whatsAppController.restart(instance)
    return {
      statusCode: 200,
      message: 'Instance restarted successfully'
    }
  }

  async getRealStatus (_id: string, token: string): Promise<IHttpStatusCode> {
    if (isEmptyNullOrUndefined(token)) {
      return {
        statusCode: 422,
        error: 'Token is required'
      }
    }
    const instance = await this.instanceRepository.findByIdAndToken(_id, token)
    if (isEmptyNullOrUndefined(instance) || instance === null) {
      return {
        statusCode: 404,
        error: 'Instance does not exist'
      }
    }
    const screenId = getScreenId(instance)

    const status = await this.whatsAppController.getStatus(screenId ?? '')
    return {
      statusCode: 200,
      message: status
    }
  }

  async logout (_id: string, token: string): Promise<IHttpStatusCode> {
    if (isEmptyNullOrUndefined(_id) || isEmptyNullOrUndefined(token)) {
      return {
        statusCode: 422,
        error: 'instance id and token are required'
      }
    }

    await this.whatsAppController.logout(_id, token)

    return {
      statusCode: 200,
      message: 'Logout completed successfully'
    }
  }
}
