import { type IFecthAlert } from '../../../share/domian/customFecth'
import type IUser from '../../../../../share/domain/user'
import type IUserState from '../../../share/domian/user'

export default interface IAuthenticationComponent {
  onSubmit: (authenticatio: IAuthentication) => Promise<void>
  isRegister: boolean
  hidenInputs?: IhidenInputs
}

export interface IAuthentication extends IFecthAlert {
  user: IUser
  navigation: (path: string) => void
  userState: IUserState
}

export interface IhidenInputs {
  username?: boolean
  cellPhone?: boolean
  email?: boolean
  password?: boolean
}
