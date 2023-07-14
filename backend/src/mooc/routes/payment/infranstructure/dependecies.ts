import { httpRequet } from '../../../share/infranstructure/httpRequest'
import { PaymentApp } from '../application/payment'
import PaymentControl from './paymentControl'
import Constantes from '../../../share/infranstructure/Constantes'
import PaymentRepository from './Database/paymentRepository'

export const paymentRepository = new PaymentRepository()
export const paymentApp = new PaymentApp(httpRequet, Constantes, paymentRepository)
export const paymentControl = new PaymentControl(paymentApp)
