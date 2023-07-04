import InstanceRepository from '../../instance/infranstructure/Database/instanceRepository'
import { initialInstance } from './initialInstances'
import WhatsAppController from './whatsApp'
const instanceRepository = new InstanceRepository()
export const whatsAppController = new WhatsAppController(instanceRepository)
initialInstance(instanceRepository, whatsAppController)
