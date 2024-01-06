import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type ISubscriptionAndInstance } from '../../../../../../share/domain/instance'
import { type TypeRol, type IBasicUser } from '../../../../../../share/domain/user'

export interface IPaymentApp {
  generateSubscription: (subscription: IBasicUser) => Promise<ISubscriptionFromApi>
  eventsControls: (body: any) => Promise<IHttpStatusCode>
  getSubscriptionInvoice: (user: IBasicUser, instanceId: string) => Promise<IHttpStatusCode>
}

export interface IPaymentRepository {
  saveSubscription: (subscription: ISubscriptionFromApi) => Promise<void>
  findOneSubscription: (filter: object) => Promise<ISubscriptionFromApi | null>
  updateStatus: (_id: string, status: string) => Promise<void>
  updateInstanceId: (_id: string, instanceId: string) => Promise<void>
  findSubscriptions: (filter: object) => Promise<ISubscriptionFromApi[]>
  findPaymentsWithInstance: (userId: string, userRol: TypeRol) => Promise<ISubscriptionAndInstance[]>
}

export interface ISubscription {
  plan_id: string
  start_time: string
  quantity: number
  subscriber: ISubscriber
  application_context: IAppContext
}

interface IAppContext {
  return_url: string
  cancel_url: string
}

interface ISubscriber {
  name: ISubscriberName
  email_address: string
}

interface ISubscriberName {
  given_name: string
  surname: string
}

export interface ISubscriptionFromApi {
  status: string
  id: string
  create_time: Date
  paymentLink: string
  links: ILinks[]
  _id: string
  userId: string
}

export interface ILinks {
  href: string
  rel: string
  method: string
}

export interface ICaptureSubscription {
  status: string
  status_update_time: string
  id: string
  plan_id: string
  start_time: string
  quantity: string
  shipping_amount: { currency_code: 'USD', value: string }
  subscriber: {
    email_address: string
    payer_id: string
    name: { given_name: string, surname: string }
    shipping_address: { address: Record<string, unknown> }
  }
  billing_info: {
    outstanding_balance: { currency_code: 'USD', value: string }
    cycle_executions: Array<Record<string, unknown>>
    last_payment: { amount: Record<string, unknown>, time: string }
    next_billing_time: string
    final_payment_time: string
    failed_payments_count: number
  }
  create_time: string
  update_time: string
  plan_overridden: boolean
  links: Array<{
    href: string
    rel: 'cancel' | 'edit' | 'self' | 'suspend' | 'capture'
    method: 'POST' | 'PATCH' | 'GET'
  }>
}
