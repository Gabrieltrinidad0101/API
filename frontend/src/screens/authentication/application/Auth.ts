import { CustomFetchError } from '../../../share/domian/customFecth'
import { type IAuthentication } from '../domian/IAuthenticaction'
import type IHttpResult from '../../../../../share/domain/httpResult'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import type IUser from '../../../../../share/domain/user'
import APIURL from '../../../share/application/Api'

const isInvalidUser = (user: IUser): string | undefined => {
  if (isEmptyNullOrUndefined(user.email, user.password)) return 'All The Inputs Are Required'
  if (user.isRegister === undefined || !user.isRegister) return
  if (isEmptyNullOrUndefined(user.email, user.cellPhone)) return 'All The Inputs Are Required'
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!pattern.test(user.email)) {
    return 'Valid email'
  }
}

const Auth = async (authenticaction: IAuthentication): Promise<void> => {
  try {
    const isInvalid = isInvalidUser(authenticaction.user)
    if (isInvalid !== undefined) {
      authenticaction.toast.error(isInvalid); return
    }
    const httpResult = await authenticaction.customFecth.post<IHttpResult<string>>(APIURL.authentication, authenticaction.user)
    if (httpResult == null) return
    localStorage.setItem('token', httpResult.message ?? '')
    authenticaction.toast.sucess(`Welcome ${authenticaction.user.name ?? ''}`)
    authenticaction.navigation('/home')
    authenticaction.userState.setUser(authenticaction.user)
  } catch (error) {
    const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
    authenticaction.toast.error(errorToShow)
  }
}
const updateUser = async (authenticaction: IAuthentication): Promise<void> => {
  try {
    const isInvalid = isInvalidUser(authenticaction.user)
    if (isInvalid !== undefined) {
      authenticaction.toast.error(isInvalid); return
    }
    const httpResult = await authenticaction.customFecth.post<IHttpResult<string>>(APIURL.updateUser, authenticaction.user)
    if (httpResult == null) return
    localStorage.setItem('token', httpResult.message ?? '')
    authenticaction.userState.setUser(authenticaction.user)
  } catch (error) {
    const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
    authenticaction.toast.error(errorToShow)
  }
}

export default { Auth, updateUser }
