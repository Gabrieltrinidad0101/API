import Instance from '../application/instance'
import { instanceRepository } from './Database/instanceRepository'
import InstanceControl from './instanceControl'
import { paymentApp, paymentRepository } from '../../payment/infranstructure/dependecies'
import { whatsAppController } from '../../../whatsAppControl/infranstructure/dependencies'
const instance = new Instance({
  instanceRepository,
  whatsAppController,
  paymentApp,
  paymentRepository
})
export const instanceControl = new InstanceControl(instance)
