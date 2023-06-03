import type IInstance from '../../../../../share/domain/instance'
import { type ISearchInstance } from '../../../../../share/domain/instance'

export default interface IInstanceRepository {
  update: (Instance: IInstance) => Promise<IInstance>
  findById: (_id: string, userId: string) => Promise<IInstance | null>
  get: (searchHttp: ISearchInstance, userId: string) => Promise<IInstance[]>
  delete: (_id: string, userId: string) => Promise<void>
  updateQr: (_id: string, qr: string) => Promise<void>
  getQr: (_id: string, token: string) => Promise<string | undefined>
}