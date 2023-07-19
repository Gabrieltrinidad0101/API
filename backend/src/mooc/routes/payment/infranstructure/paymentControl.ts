import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type Request } from 'express'
import { generateObjectPaymentPlan, generateObjectPaymentProduct, generateObjectSubscription } from '../../../payment/infranstructure/jsonPayment'
import { type PaymentApp } from '../application/payment'

export default class PaymentControl {
  constructor (
    private readonly paymentApp: PaymentApp
  ) { }

  createProduct = async (req: Request): Promise<IHttpStatusCode> => {
    const product = generateObjectPaymentProduct()
    return await this.paymentApp.createProduct(product)
  }

  createPlan = async (req: Request): Promise<IHttpStatusCode> => {
    const plan = generateObjectPaymentPlan('PROD-72T043296N7997729')
    return await this.paymentApp.createPlan(plan)
  }

  createSubscription = async (req: Request): Promise<IHttpStatusCode> => {
    const subscription = generateObjectSubscription('P-78K5121934265310HMS2A3JY')
    return await this.paymentApp.createSubscription(subscription)
  }

  test = async (req: Request): Promise<IHttpStatusCode> => {
    return {
      message: 'ok'
    }
  }
}
