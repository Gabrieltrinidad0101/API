import type IUser from '../../../../share/domain/user'

export default interface IUserState {
  user: IUser
  setUser: TypeSetUser
}

export type TypeSetUser = (user: IUser) => void
