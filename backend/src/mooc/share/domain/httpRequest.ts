export interface IFormatHttpRequest {
  url: string
  body: object | string
  auth?: {
    user?: string
    pass?: string
  }
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
}

export type IHttpRequest = (formatHttpRequest: IFormatHttpRequest) => Promise<any>
