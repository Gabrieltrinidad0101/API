import axios, { AxiosError } from 'axios'
import type ICustomFecth from '../domian/customFecth'
import type BaseHttp from '../domian/baseHttp'
import { Toast, serverUrl } from './dependencies'

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

  async get<T>(url: string, headers?: object | undefined): Promise<T | undefined> {
    const response = await this.baseHttp<T>({
      url,
      headers,
      method: 'get'
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

  async baseHttp<T>(baseHttp: BaseHttp): Promise<T | undefined> {
    let showNoAlert = false
    try {
      const token = localStorage.getItem('token')
      baseHttp.headers = { ...baseHttp.headers, token }
      setTimeout(() => {
        if (showNoAlert) return
        document.getElementById('LoadingFetch')?.setAttribute('style', 'display:flex')
      }, 500)
      const result = await this.customFecth.request(baseHttp)
      document.getElementById('LoadingFetch')?.setAttribute('style', 'display:none')
      showNoAlert = true
      return result.data as T
    } catch (error: unknown) {
      console.log(error)
      showNoAlert = true
      document.getElementById('LoadingFetch')?.setAttribute('style', 'display:none')
      if (error instanceof AxiosError) {
        const errorMsg: string = ((error.response !== undefined) && error.response.data !== '') ? `${error.response?.data.message as string}` : 'Internal error try later'
        Toast.error(errorMsg)
        return
      }
      Toast.error('Internal error try later')
    }
  }
}

export { CustomFecth }
