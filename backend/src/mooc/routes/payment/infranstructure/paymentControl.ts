import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type Request } from 'express'

export default class PaymentControl {
  createProduct = async (req: Request): Promise<IHttpStatusCode> => {
    return {}
  }
}
