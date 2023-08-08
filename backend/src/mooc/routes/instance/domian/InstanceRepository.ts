import type IInstance from '../../../../../../share/domain/instance'
import { type TypeStatusInstance, type ISearchInstance, type IInstanceQRStatus } from '../../../../../../share/domain/instance'

export default interface IInstanceRepository {
  insert: (Instance: IInstance) => Promise<IInstance>
  findByIdAndUserId: (_id: string, userId: string) => Promise<IInstance | null>
  findByIdAndToken: (_id: string, token: string) => Promise<IInstance | null>
  get: (searchHttp: ISearchInstance) => Promise<IInstance[]>
  delete: (_id: string, userId: string) => Promise<void>
  updateQr: (_id: string, value: string) => Promise<void>
  updateEndService: (_id: string, value: Date) => Promise<void>
  updateStatus: (_id: string, value: TypeStatusInstance) => Promise<void>
  updateMessageLimit: (_id: string, limit: number) => Promise<void>
  getQrAndStatus: (_id: string, token: string) => Promise<IInstanceQRStatus | undefined | null>
  saveWebhookUrl: (_id: string, url: string) => Promise<void>
  saveName: (_id: string, name: string) => Promise<void>
  find: (filter: object) => Promise<IInstance[]>
  findOne: (filter: object) => Promise<IInstance | null>
}
