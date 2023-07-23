import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { type ILimitSearch } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'
import type IHttpResult from '../../../../../share/domain/httpResult'
import type ICustomFecth from '../../../share/domian/customFecth'
import type InstanceApp from '../../Instance/application/instanceApp'

export default class InstancesApp {
  constructor (
    private readonly instanceApp: InstanceApp,
    private readonly customFecth: ICustomFecth
  ) { }

  createNewInstance = async (userName: string): Promise<IInstance | undefined> => {
    const instance = await this.instanceApp.save({
      name: 'Default',
      status: 'initial',
      userName
    }, 'noShowSucessAlter')
    return instance
  }

  get = async ({ skip, limit, search }: ILimitSearch): Promise<IInstance[] | undefined> => {
    const url = `/get?skip=${skip}&limit=${limit}&search=${search}`
    const reponseHttp = await this.customFecth.get<IInstance[]>(url)
    if (isEmptyNullOrUndefined(reponseHttp?.message) || reponseHttp?.message === undefined) return
    return reponseHttp?.message
  }

  deleteInstance = async (InstanceID: string): Promise<void> => {
    await this.customFecth.delete<IHttpResult<IInstance[]>>(`/delete/${InstanceID}`)
  }

  goToInstance = async (InstanceId: string | undefined, type: string): Promise<void> => {
    if (InstanceId === undefined) return
    window.location.href = `/editor?_id=${InstanceId}`
  }
}
