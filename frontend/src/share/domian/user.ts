import type IUser from '../../../../share/domain/user'
export default interface IUserState {
  user?: IUser
  setUser: (user: IUser) => void
}
