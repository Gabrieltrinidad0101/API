import { type Request } from 'express'
import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import type IUser from '../../../../../../share/domain/user'
import { type IUserUpdate, type TypeRol } from '../../../../../../share/domain/user'
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
    const rol = req.headers.userRol as TypeRol
    return await this.userControl.getUsers(rol)
  }

  verifyAuthentication = async (req: Request): Promise<IHttpStatusCode> => {
    const _id = req.headers.userId?.toString()
    const httpResult = await this.userControl.searchUserById(_id)
    return httpResult
  }
}
