import type IUser from '../../../../../../share/domain/user'
import { type IUserRegister, type IUserUpdate } from '../../../../../../share/domain/user'
export default interface IUserRepository {
  insert: (user: IUserRegister) => Promise<IUser | null>
  update: (user: IUserUpdate) => Promise<void>
  updatePassword: (filter: object, newPassword: string) => Promise<void>
  existUserByEmailAndId: (email: string, id: string) => Promise<IUser | null>
  findById: (_id: string, filter?: object) => Promise<IUser | null>
  find: (search: object, filter?: object) => Promise<IUser[] | null>
  findOne: (search: object, filter?: object) => Promise<IUser | null>
}
