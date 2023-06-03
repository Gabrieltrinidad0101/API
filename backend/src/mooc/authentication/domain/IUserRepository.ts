import type IUser from '../../../../../share/domain/user'
export default interface IUserRepository {
  insert: (user: IUser) => Promise<IUser | null>
  findByName: (name: string) => Promise<IUser | null>
  findById: (id: string, filter?: object) => Promise<IUser | null>
}
