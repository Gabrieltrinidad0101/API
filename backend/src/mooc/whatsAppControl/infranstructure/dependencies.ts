import InstanceRepository from '../../routes/instance/infranstructure/Database/instanceRepository'
import { messageRepository } from '../../routes/messages/infranstructure/dependencies'
import { initialInstance } from './initialInstances'
import { MessageQueue } from './messageQueue'
import WhatsAppController from './whatsApp'
const instanceRepository = new InstanceRepository()
export const whatsAppController = new WhatsAppController(instanceRepository)
export const messageQueue = new MessageQueue(messageRepository)
initialInstance(instanceRepository, whatsAppController)
  .catch(error => {
    console.log(error)
  })
