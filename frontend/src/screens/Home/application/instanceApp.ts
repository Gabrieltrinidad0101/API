import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { type ISearchInstance } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'
import type IHttpResult from '../../../../../share/domain/httpResult'
import type ICustomFecth from '../../../share/domian/customFecth'
import type IToast from '../../../share/domian/IToast'
import type InstanceApp from '../../Instance/application/instanceApp'

export default class InstancesApp {
  constructor (
    private readonly instanceApp: InstanceApp,
    private readonly toast: IToast,
    private readonly customFecth: ICustomFecth
  ) { }

  createNewInstance = async (): Promise<IInstance | undefined> => {
    const instance = await this.instanceApp.save({
      name: 'Default',
      status: 'initial'
    }, 'noShowSucessAlter')
    return instance
  }

  get = async ({ skip, limit, search }: ISearchInstance): Promise<IInstance[] | undefined> => {
    const url = `/get?skip=${skip}&limit=${limit}&search=${search}`
    const reponseHttp = await this.customFecth.get<IHttpResult<IInstance[]>>(url)
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
