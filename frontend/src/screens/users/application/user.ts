import type IUser from '../../../../../share/domain/user'
import type ICustomFecth from '../../../share/domian/customFecth'
import APIURL from '../../../share/application/Api'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'

export default class UserApp {
  constructor (private readonly customFetch: ICustomFecth) {}
  getUsers = async (): Promise<IUser[] | null | undefined> => {
    const reponse = await this.customFetch.get<IUser[]>(APIURL.getUsers)
    if (!isEmptyNullOrUndefined(reponse?.error)) return
    return reponse?.message
  }
}
