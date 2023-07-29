import { type WAState } from 'whatsapp-web.js'
import type IInstance from '../../../../../share/domain/instance'
import { type TypeInstanceStart } from '../../../../../share/domain/instance'
import type ISend from '../../../../../share/domain/Send'

export default interface IWhatsAppController {
  start: (instance: IInstance, instanceStart: TypeInstanceStart) => Promise<void>
  restart: (screenId: IInstance) => Promise<void>
  logout: (instanceId: string, token: string) => Promise<void>
  send: (send: ISend) => Promise<void>
  getStatus: (screenId: string) => Promise<WAState | TypeOpenWithError | undefined>
}

export interface IIdTokenWhatsApp {
  _id: string
  token: string
}

export type TypeOpenWithError = 'openWithError'
