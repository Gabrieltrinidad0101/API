export interface IProduct {
  name: string
  description: string
  type: string
  category: string
  image_url?: string
}

export interface IPlan {
  name: string
  product_id: string
  status: string
  billing_cycles: BillingCycle[]
}

interface BillingCycle {
  frequency: {
    interval_unit: string
    interval_count: number
  }
  tenure_type: string
  sequence: number
  total_cycles: number
  pricing_scheme: {
    fixed_price: {
      value: string
      currency_code: string
    }
  }
}

export interface ISubscription {
  plan_id: string
  start_time: string
  quantity: number
  subscriber: ISubscriber
  return_url: string
  cancel_url: string
}

interface ISubscriberName {
  given_name: string
  surname: string
}

interface ISubscriber {
  name: ISubscriberName
  email_address: string
}
