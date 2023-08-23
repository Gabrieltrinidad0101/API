import { PaymentApp } from '../application/paymentApp'
import { customFecth, Toast } from '../../../share/infranstruture/dependencies'

export const paymentApp = new PaymentApp({ customFecth, toast: Toast })
