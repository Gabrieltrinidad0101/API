import { httpRequet } from '../../../share/infranstructure/httpRequest'
import { PaymentApp } from '../application/payment'
import Constantes from '../../../share/infranstructure/Constantes'
import PaymentRepository from './Database/paymentRepository'
import { paymentSubscriptionValidator } from './paymentValidator'
import InstanceRepository from '../../instance/infranstructure/Database/instanceRepository'
import PaymentControl from './paymentControl'
import { whatsAppController } from '../../../whatsAppControl/infranstructure/dependencies'
import { userRepository } from '../../user/infranstructure/dependencies'
import { subscriptionEmail } from '../../../emailSubscription/infranstructure/dependencies'
export const paymentRepository = new PaymentRepository()

export const paymentApp = new PaymentApp(
  httpRequet,
  Constantes,
  paymentRepository,
  new InstanceRepository(),
  whatsAppController,
  paymentSubscriptionValidator,
  subscriptionEmail,
  userRepository
)

export const paymentControl = new PaymentControl()
