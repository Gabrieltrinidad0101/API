import type IInstance from '../../../../../share/domain/instance'
import { type TypeInstanceStart } from '../../../../../share/domain/instance'
import { type ISendMessage } from '../../messages/domian/messages'

export default interface IWhatsAppController {
  start: (instance: IInstance, instanceStart: TypeInstanceStart) => Promise<void>
  restart: (instance: IInstance) => Promise<void>
  logout: (instanceId: string, token: string) => Promise<void>
  sendMessage: (sendMessage: ISendMessage) => Promise<void>
}
