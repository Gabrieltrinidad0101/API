import { type Request } from 'express'
import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type IToken from '../../routes/user/domain/token'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { userRepository } from '../../routes/user/infranstructure/dependencies'
import type IUserId from '../domain/userId'
export default class VerifyAuthentication {
  constructor (private readonly token: IToken) { }

  verify = async (req: Request, next?: () => void): Promise<IHttpStatusCode | undefined> => {
    try {
      const token = req.headers.token?.toString()
      if (isEmptyNullOrUndefined(token) || token === undefined) {
        return {
          message: 'No access',
          statusCode: 409
        }
      }
      const userId = this.token.verify<IUserId>(token)
      const user = userId === null ? null : await userRepository.findById(userId._id)
      if (isEmptyNullOrUndefined(user) || user === null) {
        return {
          message: 'User not found',
          statusCode: 409
        }
      }
      req.headers.userId = user._id
      req.headers.userRol = user.rol
      next?.()
    } catch (error) {
      console.error(error)
      return {
        message: 'No access',
        statusCode: 409
      }
    }
  }
}
