import type IInstance from '../../../../../../share/domain/instance'
import { type ISearchInstance } from '../../../../../../share/domain/instance'
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
    delete instance._id
    instance.token = crypto.randomUUID()
    const instanceModal = new InstanceModal({ ...instance })
    await instanceModal.save()
    return {
      ...instance,
      _id: instanceModal._id.toString()
    }
  }

  async findById (_id: string, userId: string): Promise<IInstance | null> {
    const isValid = mongoose.Types.ObjectId.isValid(_id)
    if (!isValid) return null
    const instanceModal = await InstanceModal.findOne<IInstance>({ _id, userId }, { userId: 0 })
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

  updateQr = async (_id: string, qr: string): Promise<void> => {
    await InstanceModal.updateOne({ _id }, { qr })
  }

  getQr = async (_id: string, token: string): Promise<string | undefined> => {
    const instance = await InstanceModal.findById<IInstance>({ _id, token }, { qr: 1, _id: 0 })
    if (instance === null || instance.qr === undefined) return ''
    return instance.qr.toString();
  }
}
