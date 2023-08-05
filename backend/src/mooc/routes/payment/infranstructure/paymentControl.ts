import { type Request } from 'express'
import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { paymentApp } from './dependecies'

export default class PaymentControl {
  captureSubscription = async (req: Request): Promise<IHttpStatusCode> => {
    const subscriptionId = req.query.subscription_id
    return await paymentApp.captureSubscription(subscriptionId as string)
  }
}
