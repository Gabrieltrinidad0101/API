import { httpRequet } from '../../../share/infranstructure/httpRequest'
import { PaymentApp } from '../application/payment'
import PaymentControl from './paymentControl'
import Constantes from '../../../share/infranstructure/Constantes'

export const paymentApp = new PaymentApp(httpRequet, Constantes)
export const paymentControl = new PaymentControl(paymentApp)
