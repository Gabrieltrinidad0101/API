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
  billing_cycles: IBillingCycle[]
  payment_preferences: IPaymentPreferences
}

interface IBillingCycle {
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

interface IPaymentPreferences {
  auto_bill_outstanding: boolean
  setup_fee: {
    value: string
    currency_code: string
  }
  setup_fee_failure_action: string
  payment_failure_threshold: number
}

export interface ISubscription {
  plan_id: string
  start_time: string
  quantity: number
  subscriber: ISubscriber
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

export type TCreateSubscription = ISubscription | IPlan | IProduct | null
