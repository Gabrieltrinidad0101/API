import type IInstance from '../../../../../share/domain/instance'
import { type TypeStatusInstance, type ISearchInstance, type IInstanceQRStatus } from '../../../../../share/domain/instance'

export default interface IInstanceRepository {
  update: (Instance: IInstance) => Promise<IInstance>
  findByIdAndUserId: (_id: string, userId: string) => Promise<IInstance | null>
  findByIdAndToken: (_id: string, token: string) => Promise<IInstance | null>
  get: (searchHttp: ISearchInstance, userId: string) => Promise<IInstance[]>
  delete: (_id: string, userId: string) => Promise<void>
  updateQr: (_id: string, value: string) => Promise<void>
  updateStatus: (_id: string, value: TypeStatusInstance) => Promise<void>
  getQrAndStatus: (_id: string, token: string) => Promise<IInstanceQRStatus | undefined | null>
  getAllInstance: () => Promise<IInstance[]>
  saveWebhookUrl: (_id: string, url: string) => Promise<void>
}
