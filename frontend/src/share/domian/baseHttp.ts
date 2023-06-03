export default interface IBaseHttp {
  url: string
  data?: object
  headers?: object | undefined
  method: 'get' | 'post' | 'put' | 'delete'
}
