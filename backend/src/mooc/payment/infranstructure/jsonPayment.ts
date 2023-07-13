import { type IPlan, type IProduct, type ISubscription } from '../domian/payment'

export const generateObjectPaymentProduct = (): IProduct => {
  return {
    name: 'Subscripcion Youtube',
    description: 'Subscripcion a un canal de Youtube se cobra mensualmente',
    type: 'SERVICE',
    category: 'SOFTWARE',
    image_url: 'https://avatars.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4'
  }
}

export const generateObjectPlan = (): IPlan => {
  return {
    name: 'Instance',
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
  start_time: Date.now().toString(),
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
