import { IHttpStatusCode } from "../../../../../share/domain/httpResult"
import { type Request, type Response } from 'express'

export default class MessagesControl{
    sendMessage = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
        const _id = req.params._id
        const userId = req.headers.userId?.toString() ?? ''
        
      }
}