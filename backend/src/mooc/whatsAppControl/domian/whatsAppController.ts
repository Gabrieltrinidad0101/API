import type IInstance from '../../../../../share/domain/instance'
import { ISendMessage } from '../../messages/domian/messages'

export default interface IWhatsAppController {
  start: (instance: IInstance) => Promise<void>
  sendMessage(sendMessage: ISendMessage): Promise<void>
}
