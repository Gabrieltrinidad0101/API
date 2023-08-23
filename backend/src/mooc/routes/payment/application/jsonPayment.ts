import constantes from '../../../share/infranstructure/Constantes'
import { type ISubscription, type IUserSubscriber } from '../domian/payment'
const { PAYMENT_PLAN_ID, FRONTEND_URL } = constantes

export const generateObjectSubscription = (user: IUserSubscriber): ISubscription => ({
  plan_id: PAYMENT_PLAN_ID,
  start_time: new Date(new Date().getTime() + 2000).toISOString(),
  quantity: 1,
  subscriber: {
    name: {
      given_name: user.name,
      surname: user.name
    },
    email_address: user.email
  },
  application_context: {
    return_url: `${FRONTEND_URL}/payment`,
    cancel_url: `${FRONTEND_URL}/home`
  }
})
