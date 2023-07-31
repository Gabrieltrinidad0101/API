import { httpRequet } from '../../../share/infranstructure/httpRequest'
import { PaymentApp } from '../application/payment'
import Constantes from '../../../share/infranstructure/Constantes'
import PaymentRepository from './Database/paymentRepository'
import { paymentSubscriptionValidator } from './paymentValidator'
export const paymentRepository = new PaymentRepository()
export const paymentApp = new PaymentApp(httpRequet, Constantes, paymentRepository, paymentSubscriptionValidator)
