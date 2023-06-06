import { type ISearchInstance } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'

export default interface IInstancesApp {
  createNewInstance: () => Promise<void>
  get: (searchInstance: ISearchInstance) => Promise<IInstance[] | undefined>
  deleteInstance: (InstanceID: string) => Promise<void>
  goToInstance: (InstanceId: string | undefined, type: string) => Promise<void>
}

export interface IInstanceAppTypeSearch {
  InstanceApp: IInstancesApp
}

export interface ISearchInstanceContext {
  searchCall?: (callNack: (texto: string) => void) => void
}
