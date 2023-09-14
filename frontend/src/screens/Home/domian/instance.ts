import { type ISearchInstance } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'

export default interface IInstancesApp {
  createNewInstance: () => Promise<IInstance | undefined>
  get: (searchInstance: ISearchInstance) => Promise<IInstance[] | undefined>
  deleteInstance: (InstanceID: string) => Promise<void>
  goToInstance: (InstanceId: string | undefined, type: string) => Promise<void>
}

export interface IInstanceAppTypeSearch {
  InstanceApp: IInstancesApp
}

export interface IPropInstance {
  instancesData: IInstance[]
}

export interface ISearchInstanceContext {
  searchCall?: (callNack: (texto: string) => void) => void
}

export interface IDataGridInstance {
  onClickManage?: (instanceId: string) => void
  onPayment: (instance: IInstance) => void
}
