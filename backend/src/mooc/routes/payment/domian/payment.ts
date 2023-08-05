export interface IPaymentApp {
  generateSubscription: (subscription: IUserSubscriber) => Promise<ISubscriptionFromApi>
}

export interface IPaymentRepository {
  saveSubscription: (subscription: ISubscriptionFromApi) => Promise<void>
  findOneSubscription: (filter: object) => Promise<ISubscriptionFromApi | null>
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
