import { type Request, type Response, type Router } from 'express'
import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import { Logs } from '../../../logs'

type typeCallBack = (req: Request, next?: () => void) => Promise<IHttpStatusCode | undefined>
type typeMethods = 'post' | 'get' | 'put' | 'delete' | 'patch'

export default class RouterManager {
  constructor (private readonly router: Router) { }
  post = (path: string, ...callBacks: typeCallBack[]): void => {
    this.baseMethod('post', path, ...callBacks)
  }

  get = (path: string, ...callBacks: typeCallBack[]): void => {
    this.baseMethod('get', path, ...callBacks)
  }

  delete = (path: string, ...callBacks: typeCallBack[]): void => {
    this.baseMethod('delete', path, ...callBacks)
  }

  put = (path: string, ...callBacks: typeCallBack[]): void => {
    this.baseMethod('put', path, ...callBacks)
  }

  patch = (path: string, ...callBacks: typeCallBack[]): void => {
    this.baseMethod('patch', path, ...callBacks)
  }

  private readonly baseMethod = (method: typeMethods, path: string, ...callBacks: typeCallBack[]): void => {
    this.router[method](path, (req: Request, res: Response) => {
      this.stackCallback(req, res, callBacks)
        .catch(error => {
          console.log(error)
        })
    })
  }

  private readonly stackCallback = async (req: Request, res: Response, callBacks: typeCallBack[], i: number = 0): Promise<void> => {
    try {
      const callBack = callBacks[i]
      const next = (): void => {
        this.stackCallback(req, res, callBacks, ++i)
          .catch(error => {
            console.log(error)
          })
      }
      const response = await callBack(req, next)
      if (response === undefined) return
      res.status(response.statusCode ?? 200).send(response)
    } catch (error) {
      Logs.Exception(error)
      res.status(500).send({ message: 'Error try later' })
    }
  }
}
