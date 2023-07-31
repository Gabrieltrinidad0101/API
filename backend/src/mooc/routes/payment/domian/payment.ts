export interface IPaymentApp {
  generateSubscription: (subscription: IUserSubscriber) => Promise<IPaymentLinkOrError>
}

export interface IPaymentRepository {
  saveSubscription: (subscription: ISubscriptionFromApi) => Promise<void>
}

export interface ISubscription {
  plan_id: string
  start_time: string
  quantity: number
  subscriber: ISubscriber
  return_url: string
  cancel_url: string
}

export interface IUserSubscriber {
  name: string
  email: string
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
}

export interface ILinks {
  href: string
  rel: string
  method: string
}

export interface IPaymentLinkOrError {
  paymentLink?: string
  error?: string
}
