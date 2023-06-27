import { customFecth } from '../../../share/infranstruture/dependencies'
import { Toast } from '../../../share/infranstruture/toast'
import type IUser from '../../../../../share/domain/user'
import { type TypeSetUser } from '../../../share/domian/user'
import { type IAuthentication } from '../domian/IAuthenticaction'

export const getUserTools = (user: IUser, setUser: TypeSetUser): IAuthentication => {
  return {
    user,
    toast: Toast,
    customFecth,
    setUser
  }
}
