import { type IFecthAlert } from '../../../share/domian/customFecth'
import type IUser from '../../../../../share/domain/user'
import { type TypeSetUser } from '../../../share/domian/user'
import { type TypeAuthentication } from '../../../../../share/domain/user'

export default interface IAuthenticationComponent {
  onSubmit: (authenticatio: IAuthentication) => Promise<void>
  typeAuthentication: TypeAuthentication
}

export interface IAuthentication extends IFecthAlert {
  user: IUser
  navigation?: (path: string) => void
  setUser: TypeSetUser
}

export interface IhidenInputs {
  username?: boolean
  cellPhone?: boolean
  email?: boolean
  password?: boolean
}
