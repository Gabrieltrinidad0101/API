import WhatsAppController from '../../../whatsAppControl/infranstructure/whatsApp'
import Instance from '../application/instance'
import InstanceRepository from './Database/instanceRepository'
import InstanceControl from './instanceControl'
import { paymentApp } from '../../payment/infranstructure/dependecies'

export const instanceRepository = new InstanceRepository()
const whatsAppController = new WhatsAppController(instanceRepository)
const instance = new Instance({
  instanceRepository,
  whatsAppController,
  paymentApp
})
export const instanceControl = new InstanceControl(instance)
