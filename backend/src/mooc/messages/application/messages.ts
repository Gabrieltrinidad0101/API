import { type TypeValidation } from '../../share/domain/Validator'
import type IWhatsAppController from '../../whatsAppControl/domian/whatsAppController'
import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type ISendMessage from '../../../../../share/domain/Send'
import type IInstanceRepository from '../../instance/domian/InstanceRepository'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
export default class MessagesApp {
  constructor (
    private readonly instanceRepository: IInstanceRepository,
    private readonly instanceValidation: TypeValidation,
    private readonly whatsAppController: IWhatsAppController
  ) { }

  send = async (send: ISendMessage): Promise<IHttpStatusCode> => {
    const error = this.instanceValidation(send)
    if (error !== undefined) {
      return {
        statusCode: 422,
        error
      }
    }
    const { _id, token } = send
    const instance = await this.instanceRepository.findByIdAndToken(_id, token)
    if (isEmptyNullOrUndefined(instance)) {
      return {
        statusCode: 422,
        error: `token ${token} or _id ${_id} is invalid`,
        message: 'id or token is invalid'
      }
    }
    await this.whatsAppController.send(send)
    return {
      message: 'success'
    }
  }
}
