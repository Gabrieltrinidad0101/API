import type IInstance from '../../../../../share/domain/instance'
import { type TypeSearchInstance } from '../../../../../share/domain/instance'
import type IInstanceApp from './instance'

export default interface ICard {
  instances: IInstance[]
  deleteInstance: (cardID: string) => Promise<void>
}

export interface IPropCard {
  instance: IInstance
  type: TypeSearchInstance
  InstanceApp: IInstanceApp
  deleteInstance: (cardId: string) => Promise<void>
}
