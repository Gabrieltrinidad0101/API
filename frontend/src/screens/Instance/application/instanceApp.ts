import { CustomFetchError, type IFecthAlert } from '../../../share/domian/customFecth'
import { type SaveInstance } from '../../../../../share/domain/instance'
import type IInstanceApp from '../domian/IInstance'
import type IInstance from '../../../../../share/domain/instance'
import IHttpResult from '../../../../../share/domain/httpResult'

export default class InstanceApp implements IInstanceApp {
  constructor (private readonly fetchAlert: IFecthAlert) {}

  save = async (InstanceBasic: IInstance, showSucessAlter?: 'noShowSucessAlter'): Promise<string | undefined> => {
    try {
      const responseHttp = await this.fetchAlert.customFecth.post<SaveInstance>('/save', {
        ...InstanceBasic
      })
      if (showSucessAlter !== 'noShowSucessAlter') this.fetchAlert.toast.sucess(responseHttp?.message)
      return responseHttp?._id
    } catch (error) {
      const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
      this.fetchAlert.toast.error(errorToShow)
    }
  }

  findById = async (_id: string): Promise<IInstance | undefined> => {
    try {
      const res = await this.fetchAlert.customFecth.get<IHttpResult<IInstance>>(`/findById/${_id}`)
      if(res === undefined) return undefined
      const instance = res.message
      return instance
    } catch (error) {
      const errorToShow = error instanceof CustomFetchError ? error.message : 'Internal error try later'
      this.fetchAlert.toast.error(errorToShow)
    }
  }
}
