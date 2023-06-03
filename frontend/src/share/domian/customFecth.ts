import type BaseHttp from '../../share/domian/baseHttp'
import type IToast from './IToast'

export default interface ICustomFecth {
  post: <T>(url: string, body: object, headers?: object) => Promise<T | undefined>
  get: <T>(url: string, headers?: object) => Promise<T | undefined>
  put: <T>(url: string, body?: object, headers?: object) => Promise<T | undefined>
  delete: <T>(url: string, headers?: object) => Promise<T | undefined>
  baseHttp: <T>(baseHttp: BaseHttp) => Promise<T | undefined>
}

export interface IFecthAlert {
  toast: IToast
  customFecth: ICustomFecth
}

export class CustomFetchError extends Error {
}
