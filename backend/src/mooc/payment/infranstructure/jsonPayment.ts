import { type IPlan, type IProduct, type ISubscription } from '../domian/payment'

export const generateObjectPaymentProduct = (): IProduct => {
  return {
    name: 'Instance',
    description: 'Instance to send and get messages via WhatsApp',
    type: 'SERVICE',
    category: 'SOFTWARE'
  }
}

export const generateObjectPaymentPlan = (productId: string): IPlan => {
  return {
    name: 'Instance',
    product_id: productId,
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
    ],
    payment_preferences: {
      auto_bill_outstanding: true,
      setup_fee: {
        value: '25',
        currency_code: 'USD'
      },
      setup_fee_failure_action: 'CONTINUE',
      payment_failure_threshold: 0
    }
  }
}

export const generateObjectSubscription = (planId: string): ISubscription => ({
  plan_id: planId,
  start_time: '2023-08-16T00:00:00Z',
  quantity: 1,
  subscriber: {
    name: {
      given_name: 'Leifer',
      surname: 'Mendez'
    },
    email_address: 'customer@example.com'
  },
  return_url: 'http://localhost:4000/payment/sucess',
  cancel_url: 'http://localhost:4000/payment/cancel'
})
