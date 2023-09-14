import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { type ILimitSearch } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'
import type IHttpResult from '../../../../../share/domain/httpResult'
import type InstanceApp from '../../Instance/application/instanceApp'
import { type IFecthAlert } from '../../../share/domian/customFecth'
import APIURL from '../../../share/application/Api'

export default class InstancesApp {
  constructor (
    private readonly instanceApp: InstanceApp,
    private readonly fecthAlert: IFecthAlert
  ) { }

  createNewInstance = async (): Promise<IInstance | undefined> => {
    const instance = await this.instanceApp.save()
    return instance
  }

  get = async ({ skip, limit, search }: ILimitSearch): Promise<IInstance[] | undefined> => {
    const url = `/get?skip=${skip}&limit=${limit}&search=${search}`
    const reponseHttp = await this.fecthAlert.customFecth.get<IInstance[]>(url)
    if (isEmptyNullOrUndefined(reponseHttp?.message) || reponseHttp?.message === undefined) return
    return reponseHttp?.message
  }

  deleteInstance = async (InstanceID: string): Promise<void> => {
    await this.fecthAlert.customFecth.delete<IHttpResult<IInstance[]>>(`/delete/${InstanceID}`)
  }

  goToInstance = async (InstanceId: string | undefined, type: string): Promise<void> => {
    if (InstanceId === undefined) return
    window.location.href = `/editor?_id=${InstanceId}`
  }

  reCreateSubscription = async (instancesData: IInstance[], instanceId: string): Promise<string | undefined> => {
    const instances = instancesData.filter(instance => instance._id === instanceId)
    if (instances.length === 0) {
      // todo - send return to sentry
      this.fecthAlert.toast.error('Error getting instance data.')
      return
    }
    const { status, paymentLink } = instances[0]
    if (status === 'unpayment') {
      window.open(paymentLink, '_blank')
    } else if (status === 'cancel') {
      const url = APIURL.reCreateSubscription
      const res = await this.fecthAlert.customFecth.post<string>(url, { instanceId })
      if (isEmptyNullOrUndefined(res?.error)) return
      if (isEmptyNullOrUndefined(res?.message) || res?.message === undefined) {
        // todo send error to sentry
        this.fecthAlert.toast.error('Error getting the payment link, try again later')
        return
      }
      const link = res.message
      return link
    }
  }
}
