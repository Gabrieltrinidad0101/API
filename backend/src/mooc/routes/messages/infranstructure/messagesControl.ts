import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type Request } from 'express'
import type MessagesApp from '../application/messages'
import type ISendMessage from '../../../../../../share/domain/Send'

export default class MessagesControl {
  constructor (
    private readonly messagesApp: MessagesApp
  ) {}

  send = async (req: Request): Promise<IHttpStatusCode> => {
    const _id = req.params._id
    const data = req.body as ISendMessage
    data._id = _id
    return await this.messagesApp.send(data)
  }
}
