import { CustomFetchError, type IFecthAlert } from '../../../share/domian/customFecth'
import { type ISaveInstance } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'
import type ISendMessage from '../../../../../share/domain/Send'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import APIURL from '../../../share/application/Api'

export default class InstanceApp {
  constructor (private readonly fetchAlert: IFecthAlert) {}

  save = async (): Promise<IInstance | undefined> => {
    try {
      const responseHttp = await this.fetchAlert.customFecth.post<ISaveInstance>('/save', {})
      if (responseHttp === undefined) return
      return responseHttp?.message?.instance
    } catch (error) {
      const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
      this.fetchAlert.toast.error(errorToShow)
    }
  }

  findById = async (_id: string): Promise<IInstance | undefined> => {
    try {
      const res = await this.fetchAlert.customFecth.get<IInstance>(`/findById/${_id}`)
      if (res === undefined) return
      const instance = res.message
      return instance
    } catch (error) {
      const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
      this.fetchAlert.toast.error(errorToShow)
    }
  }

  sendTestMessage = async (send: ISendMessage): Promise<void> => {
    try {
      const url = isEmptyNullOrUndefined(send.body) ? APIURL.sendMessage(send._id) : APIURL.sendDocument(send._id)
      const res = await this.fetchAlert.customFecth.post<string>(url, send)
      if (res?.message === undefined) return
      this.fetchAlert.toast.sucess(res?.message.toString())
    } catch (error) {
      const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
      this.fetchAlert.toast.error(errorToShow)
    }
  }

  saveWebhookUrl = async (id: string, webhookUrl: string): Promise<void> => {
    try {
      const url = APIURL.saveWebhookUrl(id)
      const res = await this.fetchAlert.customFecth.post<string>(url, { webhookUrl })
      if (res?.message === undefined) return
      this.fetchAlert.toast.sucess(res?.message.toString())
    } catch (error) {
      const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
      this.fetchAlert.toast.error(errorToShow)
    }
  }

  logout = async (_id: string, token: string): Promise<void> => {
    const url = APIURL.logoutInstance(_id)
    const { error, message } = await this.fetchAlert.customFecth.post<string>(url, { token }) ?? {}
    if (error !== undefined || isEmptyNullOrUndefined(message) || message === undefined) return
    this.fetchAlert.toast.sucess(message)
  }

  saveName = async ({ _id, name, token }: IInstance): Promise<void> => {
    const url = APIURL.saveInstanceName(_id)
    const { error, message } = await this.fetchAlert.customFecth.post<string>(url, {
      token,
      name
    }) ?? {}
    if (error !== undefined || isEmptyNullOrUndefined(message) || message === undefined) return
    this.fetchAlert.toast.sucess(message)
  }

  restart = async (id: string, token: string): Promise<void> => {
    const url = APIURL.restartInstance(id)
    const { error, message } = await this.fetchAlert.customFecth.post<string>(url, { token }) ?? {}
    if (error !== undefined || isEmptyNullOrUndefined(message) || message === undefined) return
    this.fetchAlert.toast.sucess(message)
  }

  getRealStatus = async (id: string, token: string): Promise<void> => {
    const url = APIURL.getRealInstanceStatus(id)
    const { error, message } = await this.fetchAlert.customFecth.get<string>(url, { instanceToken: token }) ?? {}
    if (error !== undefined || isEmptyNullOrUndefined(message) || message === undefined) return
    this.fetchAlert.toast.sucess(message)
  }
}
