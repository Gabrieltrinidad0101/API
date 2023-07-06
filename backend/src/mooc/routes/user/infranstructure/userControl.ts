import { type Request } from 'express'
import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import type IUser from '../../../../../../share/domain/user'
import type Authentication from '../application/userApp'

export default class UserControl {
  constructor (private readonly userControl: Authentication) { }

  authentication = async (req: Request): Promise<IHttpStatusCode> => {
    const newUser = req.body as IUser
    const response = (newUser.isRegister ?? false)
      ? await this.userControl.register(newUser)
      : await this.userControl.login(newUser)
    return response
  }

  update = async (req: Request): Promise<IHttpStatusCode> => {
    const newUser = req.body as IUser
    newUser._id = req.headers.userId?.toString()
    const response = this.userControl.update(newUser)
    return await response
  }

  verifyAuthentication = async (req: Request): Promise<IHttpStatusCode> => {
    const _id = req.headers.userId?.toString()
    const httpResult = await this.userControl.searchUserById(_id)
    return httpResult
  }
}
