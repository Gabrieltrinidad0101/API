import { type ISubscription, type IUserSubscriber } from '../domian/payment'

export const generateObjectSubscription = (user: IUserSubscriber): ISubscription => ({
  plan_id: '',
  start_time: '2023-08-16T00:00:00Z',
  quantity: 1,
  subscriber: {
    name: {
      given_name: user.name,
      surname: user.name
    },
    email_address: user.email
  },
  return_url: 'http://localhost:4000/payment/sucess',
  cancel_url: 'http://localhost:4000/payment/cancel'
})
