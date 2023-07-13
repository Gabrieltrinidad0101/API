export interface IFormatHttpRequest {
  url: string
  body: object
  auth?: {
    user?: string
    pass?: string
  }
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
}

export type IHttpRequest = (formatHttpRequest: IFormatHttpRequest) => Promise<any>
