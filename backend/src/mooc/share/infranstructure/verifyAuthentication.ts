import { type Request, type Response } from 'express'
import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type IToken from '../../authentication/domain/token'
import type IUserId from '../domain/userId'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
export default class VerifyAuthentication {
  constructor (private readonly token: IToken) { }

  verify = async (req: Request, res: Response, next?: () => void): Promise<IHttpStatusCode | undefined> => {
    try {
      const token = req.headers.token?.toString()
      if (isEmptyNullOrUndefined(token) || token === undefined) {
        return {
          message: 'No access',
          statusCode: 409
        }
      }
      const userId = this.token.verify<IUserId>(token)
      req.headers.userId = userId?._id
      if (next != null) next()
    } catch (error) {
      console.error(error)
      return {
        message: 'No access',
        statusCode: 409
      }
    }
  }
}
