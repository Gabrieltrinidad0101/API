import { type TypeValidation } from '../../share/domain/Validator'
import type IWhatsAppController from '../../whatsAppControl/domian/whatsAppController'
import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type ISendMessage from '../../../../../share/domain/SendMessage'
export default class MessagesApp {
  constructor (
    private readonly instanceValidation: TypeValidation,
    private readonly whatsAppController: IWhatsAppController
  ) { }

  sendMessage = async (sendMessage: ISendMessage): Promise<IHttpStatusCode> => {
    const error = this.instanceValidation(sendMessage)
    if (error !== undefined) {
      return {
        statusCode: 422,
        error
      }
    }
    await this.whatsAppController.sendMessage(sendMessage)
    return {
      message: 'success'
    }
  }
}
