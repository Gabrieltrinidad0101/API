import { type IMessageRepository } from '../../domian/messages'
import { type ISendMessageUserId } from '../../../../../../../share/domain/Send'
import { MessageModal } from './messageSchema'

class MessageRepository implements IMessageRepository {
  insert = async (send: ISendMessageUserId): Promise<void> => {
    const messageModal = new MessageModal(send)
    await messageModal.save()
  }

  delete = async (send: ISendMessageUserId): Promise<void> => {
    await MessageModal.deleteOne({ _id: send._id })
  }

  async find (filter: Record<string, unknown>): Promise<ISendMessageUserId[]> {
    const instanceModal = await MessageModal.find<ISendMessageUserId>(filter)
    return instanceModal
  }
}

export const messageRepository = new MessageRepository()
