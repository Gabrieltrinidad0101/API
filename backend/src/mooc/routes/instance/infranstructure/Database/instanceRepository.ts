import type IInstance from '../../../../../../../share/domain/instance'
import { type TypeStatusInstance, type ISearchInstance, type IInstanceQRStatus } from '../../../../../../../share/domain/instance'
import type IInstanceRepository from '../../domian/InstanceRepository'
import InstanceModal from './instanceSchema'
import mongoose from 'mongoose'
import { findInstanceQuery } from './findInstanceQuery'
import { userRepository } from '../../../user/infranstructure/dependencies'

export default class InstanceRepository implements IInstanceRepository {
  insert = async (instance: IInstance): Promise<IInstance> => {
    const instanceModal = new InstanceModal({
      ...instance,
      _id: new mongoose.Types.ObjectId()
    })
    const instanceSave = await instanceModal.save()
    return {
      ...instance,
      _id: instanceSave._id.toString()
    }
  }

  async find (filter: object): Promise<IInstance[]> {
    const instanceModal = await InstanceModal.find<IInstance>(filter)
    return instanceModal
  }

  async findOne (filter: object): Promise<IInstance | null> {
    const instanceModal = await InstanceModal.findOne<IInstance>(filter)
    return instanceModal
  }

  async findByIdAndUserId (_id: string, userId: string): Promise<IInstance | null> {
    const isValid = mongoose.Types.ObjectId.isValid(_id)
    if (!isValid) return null
    const user = await userRepository.findOne({ _id: userId })
    const query = user?.rol === 'admin' ? { _id } : { _id, userId }
    const instanceModal = await InstanceModal.findOne<IInstance>(query, { userId: 0 })
    return instanceModal
  }

  async findByIdAndToken (_id: string, token: string): Promise<IInstance | null> {
    const isValid = mongoose.Types.ObjectId.isValid(_id)
    if (!isValid) return null
    const instanceModal = await InstanceModal.findOne<IInstance>({ _id, token }, { userId: 0 })
    return instanceModal
  }

  get = async (searchHttp: ISearchInstance): Promise<IInstance[]> => {
    const instanceModal = await InstanceModal.find<IInstance>(findInstanceQuery(searchHttp))
      .skip(searchHttp.skip)
      .sort({ _id: -1 })
      .limit(searchHttp.limit)
    return instanceModal
  }

  delete = async (_id: string, userId: string): Promise<void> => {
    await InstanceModal.deleteOne({ _id, userId })
  }

  updateQr = async (_id: string, value: string): Promise<void> => {
    await this.updateInstance(_id, 'qr', value)
  }

  updateMessageLimit = async (_id: string, value: number): Promise<void> => {
    await this.updateInstance(_id, 'messageLimit', value)
  }

  updateStatus = async (_id: string, value: TypeStatusInstance): Promise<void> => {
    await this.updateInstance(_id, 'status', value)
    if (value === 'initial') await this.updateInstance(_id, 'initialDate', new Date())
  }

  saveWebhookUrl = async (_id: string, webhookUrl: string): Promise<void> => {
    await this.updateInstance(_id, 'webhookUrl', webhookUrl)
  }

  saveName = async (_id: string, name: string): Promise<void> => {
    await this.updateInstance(_id, 'name', name)
  }

  updateEndService = async (_id: string, value: Date): Promise<void> => {
    await this.updateInstance(_id, 'endService', value)
  }

  private readonly updateInstance = async (_id: string, key: keyof IInstance, value: unknown): Promise<void> => {
    await InstanceModal.updateOne({ _id }, { [key]: value })
  }

  getQrAndStatus = async (_id: string, token: string): Promise<IInstanceQRStatus | undefined | null> => {
    const instance = await InstanceModal.findById<IInstanceQRStatus>({ _id, token }, { qr: 1, status: 1, _id: 0 })
    return instance
  }
}

export const instanceRepository = new InstanceRepository()
