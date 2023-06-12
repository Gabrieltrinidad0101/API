import type IInstance from '../../../../../share/domain/instance'
import { type IInstanceAuthentication } from '../../../../../share/domain/instance'
export interface IInstanceEvents {
  save: () => Promise<void>
  instanceName?: string
  changeName: (name: string) => void
}

export interface IToAndMessage {
  to?: number
  body?: string
}

export interface ISendMessage extends IInstanceAuthentication, IToAndMessage {
}
