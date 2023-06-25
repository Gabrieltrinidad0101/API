import type IUser from '../../../../../share/domain/user'

export interface IPropIUserComponent<Component> {
  userComponent: IUserComponent<Component>
}

export default interface IUserComponent<Component> {
  user: IUser
  onSubmit: (authenticatio: IUser) => Promise<void>
  hidenInputs?: IhidenInputs
  logo: Component
  footer?: Component
  submitButtonName: string
}

export interface IhidenInputs {
  username?: boolean
  cellPhone?: boolean
  email?: boolean
  password?: boolean
}
