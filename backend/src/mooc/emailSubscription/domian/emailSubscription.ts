import { type IBasicUser } from '../../../../../share/domain/user'

export interface ISubscriptionEmail {
  send: (user: IBasicUser, instanceId: string, instanceCreated: Date) => Promise<string | undefined>
}
