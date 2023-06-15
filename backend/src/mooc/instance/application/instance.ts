import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { type ISearchInstance, type SaveInstance } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'
import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type IInstanceRepository from '../domian/InstanceRepository'
import { type TypeValidation } from '../../share/domain/Validator'
import type IWhatsAppController from '../../whatsAppControl/domian/whatsAppController'
import type IInstanceContructor from '../domian/instance'
export default class Instance {
  private readonly instanceRepository: IInstanceRepository
  private readonly instanceValidator: TypeValidation
  private readonly urlValidator: TypeValidation
  private readonly whatsAppController: IWhatsAppController

  constructor (
    { instanceRepository, instanceValidator, urlValidator, whatsAppController }: IInstanceContructor
  ) {
    this.instanceRepository = instanceRepository
    this.instanceValidator = instanceValidator
    this.urlValidator = urlValidator
    this.whatsAppController = whatsAppController
  }

  private validateSearchHttp (searchHttp: ISearchInstance): boolean {
    return isEmptyNullOrUndefined(searchHttp.skip) ||
      isEmptyNullOrUndefined(searchHttp.limit)
  }

  async save (Instance: IInstance): Promise<SaveInstance> {
    const error = this.instanceValidator(Instance)
    if (error !== undefined) {
      return {
        statusCode: 422,
        error
      }
    }
    const instanceSaved = await this.instanceRepository.update(Instance)
    this.whatsAppController.start(instanceSaved)
      .catch(error => {
        console.log(error)
      })
    return {
      statusCode: 200,
      message: 'Instance saved successfully',
      instance: instanceSaved
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
    const Instance = await this.instanceRepository.get(searchHttp, userId)
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
        error: 'Invalid token'
      }
    }
    const qrAndStatus = await this.instanceRepository.getQrAndStatus(_id, token)
    return {
      statusCode: 200,
      message: qrAndStatus
    }
  }

  async saveWebhookUrl (_id: string, webhookUrl: string): Promise<IHttpStatusCode> {
    const error = this.urlValidator({ webhookUrl })
    if (error !== undefined) {
      return {
        statusCode: 422,
        error
      }
    }
    await this.instanceRepository.saveWebhookUrl(_id, webhookUrl)
    return {
      statusCode: 200,
      message: 'Save Success'
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
      message: 'Save Success'
    }
  }
}
