import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type Request } from 'express'
import { generateObjectPaymentProduct } from '../../../payment/infranstructure/jsonPayment'
import { type PaymentApp } from '../application/payment'

export default class PaymentControl {
  constructor (
    private readonly paymentApp: PaymentApp
  ) { }

  createProduct = async (req: Request): Promise<IHttpStatusCode> => {
    const product = generateObjectPaymentProduct()
    return await this.paymentApp.createProduct(product)
  }
}
