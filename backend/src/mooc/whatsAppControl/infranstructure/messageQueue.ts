import { type ISendMessageUserId } from '../../../../../share/domain/Send'
import { Logs } from '../../../logs'
import { type IMessageRepository } from '../../routes/messages/domian/messages'

export class MessageQueue {
  constructor (private readonly messageRepository: IMessageRepository) {}

  insert = async (message: ISendMessageUserId): Promise<void> => {
    try {
      await this.messageRepository.insert(message)
    } catch (ex) {
      Logs.Error(`
Error saving the queue message ${JSON.stringify(ex)}
message = ${JSON.stringify(message)}
`)
    }
  }

  delete = async (message: ISendMessageUserId): Promise<void> => {
    try {
      await this.messageRepository.delete(message)
    } catch (ex) {
      Logs.Error(`
Error deleting the queue message ${JSON.stringify(ex)}
message = ${JSON.stringify(message)}
`)
    }
  }
}
