import { CustomFetchError } from '../../../share/domian/customFecth'
import { type IAuthentication } from '../domian/IAuthenticaction'
import type IHttpResult from '../../../../../share/domain/httpResult'

const Auth = async (authenticaction: IAuthentication): Promise<void> => {
  try {
    if (authenticaction.user.name === '' || authenticaction.user.password === '') {
      authenticaction.toast.error('All the inputs are required'); return
    }
    const httpResult = await authenticaction.customFecth.post<IHttpResult<string>>('/user/authentication', authenticaction.user)
    if (httpResult == null) return
    localStorage.setItem('token', httpResult.message)
    authenticaction.toast.sucess(`Welcome ${authenticaction.user.name ?? ''}`)
    authenticaction.navigation('/home')
    authenticaction.userState.setUser(authenticaction.user)
  } catch (error) {
    const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
    authenticaction.toast.error(errorToShow)
  }
}

export default Auth
