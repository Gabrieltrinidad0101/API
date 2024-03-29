import axios, { AxiosError } from 'axios'
import type ICustomFecth from '../domian/customFecth'
import type BaseHttp from '../domian/baseHttp'
import { Toast, serverUrl, loaderAnimation } from './dependencies'
import { type IOptionsFetch } from '../domian/customFecth'

class CustomFecth implements ICustomFecth {
  private readonly customFecth = axios.create({
    baseURL: serverUrl
  })

  async post<T>(url: string, data: object, headers?: object | undefined): Promise<T | undefined> {
    return await this.baseHttp<T>({
      url,
      data,
      headers,
      method: 'post'
    })
  }

  async get<T>(url: string, headers?: object | undefined, optionsFetch?: IOptionsFetch): Promise<T | undefined> {
    const response = await this.baseHttp<T>({
      url,
      headers,
      method: 'get',
      optionsFetch
    })
    return response
  }

  async delete<T>(url: string, headers?: object | undefined): Promise<T | undefined> {
    const response = await this.baseHttp<T>({
      url,
      headers,
      method: 'delete'
    })
    return response
  }

  async put<T>(url: string, data: object = {}, headers?: object | undefined): Promise<T | undefined> {
    const response = await this.baseHttp<T>({
      url,
      data,
      headers,
      method: 'put'
    })
    return response
  }

  async patch<T>(url: string, data: object = {}, headers?: object | undefined): Promise<T | undefined> {
    const response = await this.baseHttp<T>({
      url,
      data,
      headers,
      method: 'patch'
    })
    return response
  }

  async baseHttp<T>(baseHttp: BaseHttp): Promise<T | undefined> {
    try {
      const token = localStorage.getItem('token')
      const { removeDefaultHeaders, showLoader } = baseHttp.optionsFetch ?? {}
      if (removeDefaultHeaders !== true) baseHttp.headers = { ...baseHttp.headers, token }
      if (showLoader === false) loaderAnimation.showAfter(500)
      const result = await this.customFecth.request(baseHttp)
      loaderAnimation.hide()
      return result.data as T
    } catch (error: unknown) {
      loaderAnimation.hide()
      if (baseHttp.optionsFetch?.showErrors === false) return
      let errorMsg: string = 'Internal error try later'
      if (error instanceof AxiosError) {
        const response = error.response
        errorMsg = response?.data?.message ?? errorMsg
        Toast.error(errorMsg)
        return
      }
      Toast.error(errorMsg)
    }
  }
}

export { CustomFecth }
