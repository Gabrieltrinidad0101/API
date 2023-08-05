import { type Request } from 'express'
import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import type IUser from '../../../../../../share/domain/user'
import { type IUserUpdate } from '../../../../../../share/domain/user'
import type Authentication from '../application/userApp'

export default class UserControl {
  constructor (private readonly userControl: Authentication) { }

  authentication = async (req: Request): Promise<IHttpStatusCode> => {
    const newUser = req.body as IUser
    newUser.rol = 'user'
    const response = (newUser.typeAuthentication === 'Register')
      ? await this.userControl.register(newUser)
      : await this.userControl.login(newUser)
    return response
  }

  update = async (req: Request): Promise<IHttpStatusCode> => {
    const newUser = req.body as IUserUpdate
    newUser._id = req.headers.userId?.toString() ?? ''
    return await this.userControl.update(newUser)
  }

  getUsers = async (req: Request): Promise<IHttpStatusCode> => {
    return await this.userControl.getUsers()
  }

  verifyAuthentication = async (req: Request): Promise<IHttpStatusCode> => {
    const _id = req.headers.userId?.toString()
    const httpResult = await this.userControl.searchUserById(_id)
    return httpResult
  }

  updatePassword = async (req: Request): Promise<IHttpStatusCode> => {
    const newPassword = req.body.newPassword?.toString()
    const _id = req.headers.userId?.toString() ?? ''
    const httpResult = await this.userControl.updatePassword(_id, newPassword)
    return httpResult
  }

  sendResetPassword = async (req: Request): Promise<IHttpStatusCode> => {
    const { email } = req.body
    await this.userControl.sendResetPassword(email)
    return {
      message: 'Reset Password'
    }
  }
}
