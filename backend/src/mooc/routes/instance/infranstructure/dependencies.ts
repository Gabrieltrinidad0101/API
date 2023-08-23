import Instance from '../application/instance'
import { instanceRepository } from './Database/instanceRepository'
import InstanceControl from './instanceControl'
import { paymentApp } from '../../payment/infranstructure/dependecies'
import { whatsAppController } from '../../../whatsAppControl/infranstructure/dependencies'
const instance = new Instance({
  instanceRepository,
  whatsAppController,
  paymentApp
})
export const instanceControl = new InstanceControl(instance)
