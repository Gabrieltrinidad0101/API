import { type TypeValidation } from '../../../share/domain/Validator'
import type IWhatsAppController from '../../../whatsAppControl/domian/whatsAppController'
import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type ISendMessageUserId, type ISendMessage } from '../../../../../../share/domain/Send'
import type IInstanceRepository from '../../instance/domian/InstanceRepository'
import { isEmptyNullOrUndefined } from '../../../../../../share/application/isEmptyNullUndefiner'
import { type IMessageRepository } from '../domian/messages'
import { Logs } from '../../../../logs'
export default class MessagesApp {
  constructor (
    private readonly instanceRepository: IInstanceRepository,
    private readonly instanceValidation: TypeValidation,
    private readonly whatsAppController: IWhatsAppController,
    private readonly messageRepository: IMessageRepository
  ) { }

  send = async (message: ISendMessage): Promise<IHttpStatusCode> => {
    const error = this.instanceValidation(message)
    if (error !== undefined) {
      return {
        statusCode: 422,
        error
      }
    }
    const { instanceId, token } = message
    const instance = await this.instanceRepository.findOne({ _id: instanceId })
    if (isEmptyNullOrUndefined(instance) || instance === null) {
      return {
        statusCode: 422,
        error: `token ${token} or _id ${instanceId} is invalid`,
        message: 'id or token is invalid'
      }
    }
    const messageWithUserId: ISendMessageUserId = { ...message, userId: instance.userId ?? '', isQueue: false }
    const thereIsError = await this.whatsAppController.send(instance, messageWithUserId)
    if (!isEmptyNullOrUndefined(thereIsError)) {
      return {
        statusCode: 422,
        error: 'Send the Message',
        message: thereIsError
      }
    }
    return {
      message: 'success'
    }
  }

  queuedMessage = async (userId: string): Promise<IHttpStatusCode> => {
    const queuedMessages = await this.messageRepository.find({ userId, isQueue: true })
    for (const queuedMessage of queuedMessages) {
      const instance = await this.instanceRepository.findOne({ _id: queuedMessage.instanceId })
      if (isEmptyNullOrUndefined(instance) || instance === null) {
        Logs.Error(`Error tring to get the instance in queuedMessage instance = ${JSON.stringify(instance)} message = ${JSON.stringify(queuedMessage)}`)
        continue
      }
      await this.whatsAppController.send(instance, queuedMessage)
    }
    return {
      message: 'success'
    }
  }
}
