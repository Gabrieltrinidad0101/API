import { CustomFetchError, type IFecthAlert } from '../../../share/domian/customFecth'
import { type IInstanceInitial, type SaveInstance } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'
import type IHttpResult from '../../../../../share/domain/httpResult'
import type ISendMessage from '../../../../../share/domain/SendMessage'
import API from '../../../share/application/Api'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import APIURL from '../../../share/application/Api'

export default class InstanceApp {
  constructor (private readonly fetchAlert: IFecthAlert) {}

  save = async (InstanceBasic: IInstanceInitial, showSucessAlter?: 'noShowSucessAlter'): Promise<IInstance | undefined> => {
    try {
      const responseHttp = await this.fetchAlert.customFecth.post<SaveInstance>('/save', {
        ...InstanceBasic
      })
      if (showSucessAlter !== 'noShowSucessAlter') this.fetchAlert.toast.sucess(responseHttp?.message)
      return responseHttp?.instance
    } catch (error) {
      const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
      this.fetchAlert.toast.error(errorToShow)
    }
  }

  findById = async (_id: string): Promise<IInstance | undefined> => {
    try {
      const res = await this.fetchAlert.customFecth.get<IHttpResult<IInstance>>(`/findById/${_id}`)
      if (res === undefined) return
      const instance = res.message
      return instance
    } catch (error) {
      const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
      this.fetchAlert.toast.error(errorToShow)
    }
  }

  sendTestMessage = async (sendMessage: ISendMessage): Promise<void> => {
    try {
      const url = isEmptyNullOrUndefined(sendMessage.body) ? APIURL.sendMessage(sendMessage._id) : APIURL.sendMessage(sendMessage._id)
      const res = await this.fetchAlert.customFecth.post<IHttpResult<string>>(url, sendMessage)
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
      const res = await this.fetchAlert.customFecth.post<IHttpResult<string>>(url, { webhookUrl })
      if (res?.message === undefined) return
      this.fetchAlert.toast.sucess(res?.message.toString())
    } catch (error) {
      const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
      this.fetchAlert.toast.error(errorToShow)
    }
  }

  logout = async (_id: string, token: string): Promise<void> => {
    const url = API.logoutInstance(_id)
    const { error, message } = await this.fetchAlert.customFecth.post<IHttpResult<string>>(url, { token }) ?? {}
    if (error !== undefined || isEmptyNullOrUndefined(message) || message === undefined) return
    this.fetchAlert.toast.sucess(message)
  }

  saveName = async ({ _id, name, token }: IInstance): Promise<void> => {
    const url = API.saveInstanceName(_id)
    const { error, message } = await this.fetchAlert.customFecth.post<IHttpResult<string>>(url, {
      token,
      name
    }) ?? {}
    if (error !== undefined || isEmptyNullOrUndefined(message) || message === undefined) return
    this.fetchAlert.toast.sucess(message)
  }

  restart = async (id: string, token: string): Promise<void> => {
    const url = API.restartInstance(id)
    const { error, message } = await this.fetchAlert.customFecth.post<IHttpResult<string>>(url, { token }) ?? {}
    if (error !== undefined || isEmptyNullOrUndefined(message) || message === undefined) return
    this.fetchAlert.toast.sucess(message)
  }
}
