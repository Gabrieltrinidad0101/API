import constantes from '../../../share/infranstructure/Constantes'
import { type ISubscription, type IUserSubscriber } from '../domian/payment'
const { PAYMENT_PLAN_ID } = constantes

export const generateObjectSubscription = (user: IUserSubscriber): ISubscription => ({
  plan_id: PAYMENT_PLAN_ID,
  start_time: new Date(new Date().getTime() + 1).toISOString(),
  quantity: 1,
  subscriber: {
    name: {
      given_name: user.name,
      surname: user.name
    },
    email_address: user.email
  },
  application_context: {
    return_url: 'http://localhost:4000/payment/sucess',
    cancel_url: 'http://localhost:4000/payment/cancel'
  }
})
