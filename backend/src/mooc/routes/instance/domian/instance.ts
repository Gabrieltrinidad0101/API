import type IInstanceRepository from './InstanceRepository'
import type IWhatsAppController from '../../../whatsAppControl/domian/whatsAppController'
import { type IPaymentApp } from '../../payment/domian/payment'

export default interface IInstanceContructor {
  instanceRepository: IInstanceRepository
  whatsAppController: IWhatsAppController
  paymentApp: IPaymentApp
}
