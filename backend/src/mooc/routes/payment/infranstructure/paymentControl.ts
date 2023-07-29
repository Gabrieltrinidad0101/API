import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type Request } from 'express'
import { generateObjectPaymentPlan, generateObjectPaymentProduct, generateObjectSubscription } from '../../../payment/infranstructure/jsonPayment'
import { type PaymentApp } from '../application/payment'
import { Logs } from '../../../../logs'

export default class PaymentControl {
  constructor (
    private readonly paymentApp: PaymentApp
  ) {
    const product = generateObjectPaymentProduct()
    const plan = generateObjectPaymentPlan()
    this.paymentApp.configurationPayment(product, plan)
      .catch(error => {
        Logs.Exception(error)
      })
  }

  configurationPayment = async (req: Request): Promise<IHttpStatusCode> => {
    const product = generateObjectPaymentProduct()
    const plan = generateObjectPaymentPlan()
    return await this.paymentApp.configurationPayment(product, plan)
  }

  createSubscription = async (req: Request): Promise<IHttpStatusCode> => {
    const subscription = generateObjectSubscription('P-78K5121934265310HMS2A3JY')
    return await this.paymentApp.createSubscription(subscription)
  }

  listOfPaypament = async (req: Request): Promise<IHttpStatusCode> => {
    return await this.paymentApp.listOfPlans()
  }

  test = async (req: Request): Promise<IHttpStatusCode> => {
    return {
      message: 'ok'
    }
  }
}
