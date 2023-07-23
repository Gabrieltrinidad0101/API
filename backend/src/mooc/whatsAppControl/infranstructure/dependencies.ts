import InstanceRepository from '../../routes/instance/infranstructure/Database/instanceRepository'
import { initialInstance } from './initialInstances'
import WhatsAppController from './whatsApp'
const instanceRepository = new InstanceRepository()
export const whatsAppController = new WhatsAppController(instanceRepository)
initialInstance(instanceRepository, whatsAppController)
  .catch(error => {
    console.log(error)
  })
