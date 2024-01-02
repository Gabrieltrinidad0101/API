import { type WAState } from 'whatsapp-web.js'
import type IInstance from '../../../../../share/domain/instance'
import { type TypeInstanceStart } from '../../../../../share/domain/instance'
import { type ISendMessageUserId } from '../../../../../share/domain/Send'

export default interface IWhatsAppController {
  start: (instance: IInstance, instanceStart: TypeInstanceStart) => Promise<void>
  restart: (screenId: IInstance) => Promise<void>
  logout: (instanceId: string, token: string) => Promise<void>
  send: (instance: IInstance, send: ISendMessageUserId) => Promise<string | undefined>
  getStatus: (screenId: string) => Promise<WAState | TypeOpenWithError | undefined>
  destroy: (screenId: string) => Promise<void>
  callBackPaymentcancelSubscription: (subscriptionId: string) => Promise<void>
}

export interface IScreenId {
  _id: string
}

export type TypeOpenWithError = 'openWithError'
