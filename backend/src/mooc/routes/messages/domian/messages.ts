import type ISend from '../../../../../../share/domain/Send'

export interface IMessageRepository {
  insert: (send: ISend) => Promise<void>
}
