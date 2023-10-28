import type IUser from '../../../../../share/domain/user'
import APIURL from '../../../share/application/Api'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { type IFecthAlert } from '../../../share/domian/customFecth'

export default class UserApp {
  constructor (private readonly fectchAlert: IFecthAlert) { }
  getUsers = async (): Promise<IUser[] | null | undefined> => {
    const reponse = await this.fectchAlert.customFecth.get<IUser[]>(APIURL.getUsers)
    if (!isEmptyNullOrUndefined(reponse?.error)) return
    return reponse?.message
  }

  isInvalidUpdateUser = ({ name, email, cellPhone }: IUser): string | undefined => {
    if (isEmptyNullOrUndefined(name, email, cellPhone)) return 'All The Inputs Are Required'
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!pattern.test(email)) { return 'Valid email' }
  }

  updateUser = async (user: IUser): Promise<boolean> => {
    try {
      const isInvalid = this.isInvalidUpdateUser(user)
      if (isInvalid !== undefined) {
        this.fectchAlert.toast.error(isInvalid)
        return true
      }
      const httpResult = await this.fectchAlert.customFecth.put<string>(APIURL.updateUser, user)
      if (httpResult == null) return true
      if (!isEmptyNullOrUndefined(httpResult.message) && httpResult.message !== undefined) {
        this.fectchAlert.toast.sucess(httpResult.message)
        return true
      }
      return false
    } catch (error) {
      this.fectchAlert.toast.error('Internal error try later')
    }
    return true
  }

  updatePassword = async (newPassword: string): Promise<boolean> => {
    try {
      const httpResult = await this.fectchAlert.customFecth.patch<string>(APIURL.updatePassword, { newPassword })
      if (httpResult == null) return true
      if (!isEmptyNullOrUndefined(httpResult.message) && httpResult.message !== undefined) {
        this.fectchAlert.toast.sucess(httpResult.message)
        return true
      }
      return false
    } catch (error) {
      this.fectchAlert.toast.error('Internal error try later')
    }
    return true
  }
}
