import { type TypeValidation } from '../../share/domain/Validator'
import type IWhatsAppController from '../../whatsAppControl/domian/whatsAppController'
import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type ISendMessage from '../../../../../share/domain/Send'
export default class MessagesApp {
  constructor (
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
    await this.whatsAppController.send(send)
    return {
      message: 'success'
    }
  }
}
