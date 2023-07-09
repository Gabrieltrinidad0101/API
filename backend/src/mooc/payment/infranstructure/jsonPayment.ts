import { type IPlan, type IProduct, type ISubscription } from '../domian/payment'

export const createPaymentProduct = (): IProduct => {
  return {
    name: 'Instance',
    description: 'Instance to send messages via WhatsApp',
    category: 'SOFTWARE',
    type: 'SERVICE'
  }
}

export const createPlan = (): IPlan => {
  return {
    name: 'PLAN mensual',
    product_id: '',
    status: 'ACTIVE',
    billing_cycles: [
      {
        frequency: {
          interval_unit: 'MONTH',
          interval_count: 1
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 12,
        pricing_scheme: {
          fixed_price: {
            value: '25',
            currency_code: 'USD'
          }
        }
      }
    ]
  }
}

export const subscription = (planId: string): ISubscription => ({
  plan_id: planId,
  start_time: '2021-11-01T00:00:00Z',
  quantity: 1,
  subscriber: {
    name: {
      given_name: 'Leifer',
      surname: 'Mendez'
    },
    email_address: 'customer@example.com'
  },
  return_url: 'http://localhost/gracias',
  cancel_url: 'http://localhost/fallo'
})
