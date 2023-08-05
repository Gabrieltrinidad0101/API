import { type Request } from 'express'
import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type IToken from '../../routes/user/domain/token'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { userRepository } from '../../routes/user/infranstructure/dependencies'
import type IUserId from '../domain/userId'

import { type IBaseAuthentication } from '../domain/httpRequest'
export default class VerifyAuthentication {
  constructor (private readonly token: IToken) { }

  private readonly baseAuthentication = async (req: Request): Promise<IBaseAuthentication> => {
    const token = req.headers.token?.toString()
    if (isEmptyNullOrUndefined(token) || token === undefined) {
      return {
        httpStatusCode: {
          message: 'No access',
          statusCode: 409
        }
      }
    }
    const userId = this.token.verify<IUserId>(token)
    const user = userId == null ? null : await userRepository.findById(userId._id)
    if (isEmptyNullOrUndefined(user) || user === null) {
      return {
        httpStatusCode: {
          message: 'User not found',
          statusCode: 409
        }
      }
    }
    req.headers.userId = user._id
    req.headers.userRol = user.rol
    req.headers.userEmail = user.email
    req.headers.userName = user.name
    return { user }
  }

  user = async (req: Request, next?: () => void): Promise<IHttpStatusCode | undefined> => {
    try {
      const res = await this.baseAuthentication(req)
      if (isEmptyNullOrUndefined(res.httpStatusCode)) { next?.() }
      return res.httpStatusCode
    } catch (error) {
      return {
        error: 'Error authenticating',
        message: 'No access',
        statusCode: 409
      }
    }
  }

  userAdmin = async (req: Request, next?: () => void): Promise<IHttpStatusCode | undefined> => {
    try {
      const res = await this.baseAuthentication(req)
      if (!isEmptyNullOrUndefined(res.httpStatusCode)) { return res.httpStatusCode }

      if (res.user?.rol !== 'admin') {
        return {
          error: 'User admin',
          message: 'No access',
          statusCode: 404
        }
      }
      next?.()
    } catch (error) {
      return {
        error: 'Error authenticating',
        message: 'No access',
        statusCode: 409
      }
    }
  }
}
