import type IUser from '../../../../../share/domain/user'
export default interface IUserRepository {
  insert: (user: IUser) => Promise<IUser | null>
  update: (user: IUser) => Promise<void>
  findByEmail: (email: string) => Promise<IUser | null>
  findById: (id: string, filter?: object) => Promise<IUser | null>
}
