import { type Request, type Response } from 'express'
import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type IUser from '../../../../../share/domain/user'
import type Authentication from '../application/auth'
import { ErrorUser } from '../domain/IErrorUser'

export default class AuthControl {
  constructor (private readonly authControl: Authentication) { }

  authentication = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
    try {
      const newUser = req.body as IUser
      const response = (newUser.isRegister ?? false)
        ? await this.authControl.register(newUser)
        : await this.authControl.login(newUser)
      return response
    } catch (ex) {
      console.log(ex)
      const message = ex instanceof ErrorUser ? ex.message : 'Error try later'
      return {
        message,
        statusCode: 500
      }
    }
  }

  verifyAuthentication = async (req: Request, res: Response): Promise<IHttpStatusCode> => {
    const _id = req.headers.userId?.toString()
    const httpResult = await this.authControl.searchUserById(_id)
    return httpResult
  }
}
