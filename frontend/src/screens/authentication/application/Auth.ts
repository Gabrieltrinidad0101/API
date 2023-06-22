import { CustomFetchError } from '../../../share/domian/customFecth'
import { type IAuthentication } from '../domian/IAuthenticaction'
import type IHttpResult from '../../../../../share/domain/httpResult'

const Auth = async (authenticaction: IAuthentication): Promise<void> => {
  try {
    const isAnyFieldEmpty = Object.values(authenticaction.user).some(field => field === '')
    if (isAnyFieldEmpty) {
      authenticaction.toast.error('All The Inputs Are Required'); return
    }
    const httpResult = await authenticaction.customFecth.post<IHttpResult<string>>('/user/authentication', authenticaction.user)
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

export default Auth
