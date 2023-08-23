import { type IMessageRepository } from '../../domian/messages'
import type ISend from '../../../../../../../share/domain/Send'
import { MessageModal } from './messageSchema'

export class MessageRepository implements IMessageRepository {
  insert = async (send: ISend): Promise<void> => {
    const messageModal = new MessageModal(send)
    await messageModal.save()
  }
}
