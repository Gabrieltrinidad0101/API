import type IInstance from '../../../../../../../share/domain/instance'
import { type TypeStatusInstance, type ISearchInstance, type IInstanceQRStatus } from '../../../../../../../share/domain/instance'
import type IInstanceRepository from '../../domian/InstanceRepository'
import InstanceModal from './instanceSchema'
import crypto from 'crypto'
import mongoose from 'mongoose'

export default class InstanceRepository implements IInstanceRepository {
  update = async (instance: IInstance): Promise<IInstance> => {
    if (instance?._id !== undefined && instance?._id !== '') {
      await InstanceModal.updateOne({ _id: instance._id }, instance)
      return instance
    }
    instance.token = crypto.randomUUID()
    const date = new Date()
    const addMonth = new Date(date.setMonth(date.getMonth() + 8)).toString()
    const instanceModal = new InstanceModal({ ...instance, endService: addMonth })
    await instanceModal.save()
    return {
      ...instance,
      _id: instanceModal._id.toString(),
      createdAt: instanceModal.createdAt
    }
  }

  async findByIdAndUserId (_id: string, userId: string): Promise<IInstance | null> {
    const isValid = mongoose.Types.ObjectId.isValid(_id)
    if (!isValid) return null
    const instanceModal = await InstanceModal.findOne<IInstance>({ _id, userId }, { userId: 0 })
    return instanceModal
  }

  async findByIdAndToken (_id: string, token: string): Promise<IInstance | null> {
    const isValid = mongoose.Types.ObjectId.isValid(_id)
    if (!isValid) return null
    const instanceModal = await InstanceModal.findOne<IInstance>({ _id, token }, { userId: 0 })
    return instanceModal
  }

  get = async (searchHttp: ISearchInstance, userId: string): Promise<IInstance[]> => {
    const instanceModal = await InstanceModal.find<IInstance>({ userId }, { content: 0 })
      .skip(searchHttp.skip)
      .sort({ _id: -1 })
      .limit(searchHttp.limit)
      .find(
        searchHttp.search === ''
          ? {}
          : { name: { $regex: searchHttp.search } }
      )
    return instanceModal
  }

  getAll = async (searchHttp: ISearchInstance, userId: string): Promise<IInstance[]> => {
    const instanceModal = await InstanceModal.find<IInstance>({ userId: { $ne: userId } }, { content: 0 })
      .skip(searchHttp.skip)
      .sort({ _id: -1 })
      .limit(searchHttp.limit)
      .find(
        searchHttp.search === ''
          ? {}
          : { name: { $regex: searchHttp.search } }
      )
    return instanceModal
  }

  delete = async (_id: string, userId: string): Promise<void> => {
    await InstanceModal.deleteOne({ _id, userId })
  }

  updateQr = async (_id: string, value: string): Promise<void> => {
    await this.updateInstance(_id, 'qr', value)
  }

  updateStatus = async (_id: string, value: TypeStatusInstance): Promise<void> => {
    await this.updateInstance(_id, 'status', value)
  }

  saveWebhookUrl = async (_id: string, webhookUrl: string): Promise<void> => {
    await this.updateInstance(_id, 'webhookUrl', webhookUrl)
  }

  saveName = async (_id: string, name: string): Promise<void> => {
    await this.updateInstance(_id, 'name', name)
  }

  private readonly updateInstance = async (_id: string, key: keyof IInstance, value: unknown): Promise<void> => {
    await InstanceModal.updateOne({ _id }, { [key]: value })
  }

  getQrAndStatus = async (_id: string, token: string): Promise<IInstanceQRStatus | undefined | null> => {
    const instance = await InstanceModal.findById<IInstanceQRStatus>({ _id, token }, { qr: 1, status: 1, _id: 0 })
    return instance
  }

  getAllInstance = async (): Promise<IInstance[]> => {
    const instances = await InstanceModal.find<IInstance>({})
    return instances
  }
}
