import type IUser from '../../../../../share/domain/user'

export interface ISubscriptionEmail {
  send: (user: IUser) => Promise<void>
}
