import { type ISendMessageUserId } from '../../../../../../share/domain/Send'

export interface IMessageRepository {
  insert: (send: ISendMessageUserId) => Promise<void>
  find: (filters: Record<string, unknown>) => Promise<ISendMessageUserId[]>
}
