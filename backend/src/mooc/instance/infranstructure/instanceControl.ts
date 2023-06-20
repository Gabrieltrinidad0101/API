import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type Instance from '../application/instance'
import { type Request, type Response } from 'express'
import { type ISearchInstance } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'

export default class InstanceControl {
  constructor (private readonly Instance: Instance) { }

  private getSearchHttp (req: Request): ISearchInstance {
    const skip = parseInt(req.query.skip?.toString() ?? '0')
    const limit = parseInt(req.query.limit?.toString() ?? '0')
    const search = req.query.search?.toString() ?? ''
    return {
      skip,
      limit,
      search
    }
  }

  logout = async (req: Request): Promise<IHttpStatusCode> => {
    const _id = req.params._id
    const token = req.body.token
    const res = await this.Instance.logout(_id, token)
    return res
  }

  save = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
    const instance = req.body as IInstance
    instance.userId = req.headers.userId?.toString() ?? ''
    const result = await this.Instance.save(instance)
    return result
  }

  findById = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
    const _id = req.params._id
    const userId = req.headers.userId?.toString() ?? ''
    const result = await this.Instance.findById(_id, userId)
    return result
  }

  get = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
    const userId = req.headers.userId?.toString() ?? ''
    const searchHttp = this.getSearchHttp(req)
    const result = await this.Instance.get(searchHttp, userId)
    return result
  }

  delete = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
    const _id = req.params._id
    const userId = req.headers.userId?.toString() ?? ''
    const result = await this.Instance.delete(_id, userId)
    return result
  }

  getQr = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
    const _id = req.params._id
    const token = req.headers.token?.toString() ?? ''
    const result = await this.Instance.getQr(_id, token)
    return result
  }

  saveWebhookUrl = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
    const _id = req.params._id
    const webhookUrl = req.body.webhookUrl
    const result = await this.Instance.saveWebhookUrl(_id, webhookUrl)
    return result
  }

  saveName = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
    const _id = req.params._id
    const name = req.body.name
    const result = await this.Instance.saveName(_id, name)
    return result
  }

  restart = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
    const _id = req.params._id
    const token = req.body.token
    const result = await this.Instance.restart(_id, token)
    return result
  }
}
