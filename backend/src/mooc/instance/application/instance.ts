import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { type ISearchInstance, type SaveInstance } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'
import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type IInstanceRepository from '../domian/InstanceRepository'
import { type TypeInstanceValidation } from '../../share/domain/Validator'
import type IWhatsAppController from '../../whatsAppControl/domian/whatsAppController'

export default class Instance {
  constructor (
    private readonly instanceRepository: IInstanceRepository,
    private readonly instanceValidation: TypeInstanceValidation,
    private readonly whatsAppController: IWhatsAppController
  ) { }

  private validateSearchHttp (searchHttp: ISearchInstance): boolean {
    return isEmptyNullOrUndefined(searchHttp.skip) ||
      isEmptyNullOrUndefined(searchHttp.limit)
  }

  async save (Instance: IInstance): Promise<SaveInstance> {
    const error = this.instanceValidation(Instance)
    if (error !== undefined) {
      return {
        statusCode: 422,
        error,
        message: 'Internal Error try later'
      }
    }
    const InstanceSaved = await this.instanceRepository.update(Instance)
    this.whatsAppController.start(InstanceSaved)
      .catch(error => {
        console.log(error)
      })
    return {
      statusCode: 200,
      message: 'Instance saved successfully',
      _id: InstanceSaved._id
    }
  }

  async findById (_id: string, userId: string): Promise<IHttpStatusCode> {
    const Instance = await this.instanceRepository.findById(_id, userId)
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
        message: 'Invalid token'
      }
    }
    const qr = await this.instanceRepository.getQr(_id, token)
    return {
      statusCode: 200,
      message: qr
    }
  }
}
