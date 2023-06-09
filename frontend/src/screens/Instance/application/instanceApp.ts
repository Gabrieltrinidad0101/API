import { CustomFetchError, type IFecthAlert } from '../../../share/domian/customFecth'
import { type SaveInstance } from '../../../../../share/domain/instance'
import type IInstanceApp from '../domian/IInstance'
import type IInstance from '../../../../../share/domain/instance'
import type IHttpResult from '../../../../../share/domain/httpResult'
import { type ISendMessage } from '../domian/IInstance'

export default class InstanceApp implements IInstanceApp {
  constructor (private readonly fetchAlert: IFecthAlert) {}

  save = async (InstanceBasic: IInstance, showSucessAlter?: 'noShowSucessAlter'): Promise<IInstance | undefined> => {
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
      const url = `/${sendMessage._id ?? ''}/messages/chat`
      const res = await this.fetchAlert.customFecth.post<IHttpResult<string>>(url, sendMessage)
      if (res?.message === undefined) return
      this.fetchAlert.toast.sucess(res?.message.toString())
    } catch (error) {
      const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
      this.fetchAlert.toast.error(errorToShow)
    }
  }
}
