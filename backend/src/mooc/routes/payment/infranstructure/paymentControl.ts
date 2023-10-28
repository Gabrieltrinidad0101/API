import { type Request } from 'express'
import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { paymentApp } from './dependecies'
import { type TypeRol } from '../../../../../../share/domain/user'

export default class PaymentControl {
  captureSubscription = async (req: Request): Promise<IHttpStatusCode> => {
    const subscriptionId = req.query.subscription_id
    return await paymentApp.captureSubscription(subscriptionId as string, 'PAGE')
  }

  captureSubscriptionRecurrent = async (req: Request): Promise<IHttpStatusCode> => {
    const body = req.body.resource.id
    return await paymentApp.captureSubscription(body as string, 'PAYPAL')
  }

  get = async (req: Request): Promise<IHttpStatusCode> => {
    const userId = req.headers.userId?.toString() ?? ''
    const userRol = req.headers.userRol?.toString() as TypeRol
    return await paymentApp.get(userId, userRol)
  }

  eventsControls = async (req: Request): Promise<IHttpStatusCode> => {
    const body = req.body
    return await paymentApp.eventsControls(body)
  }
}
