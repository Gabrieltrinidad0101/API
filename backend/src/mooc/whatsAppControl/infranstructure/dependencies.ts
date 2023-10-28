import { instanceRepository } from '../../routes/instance/infranstructure/Database/instanceRepository'
import { messageRepository } from '../../routes/messages/infranstructure/Database/messageRepository'
import { initialInstance } from './initialInstances'
import { MessageQueue } from './messageQueue'
import WhatsAppController from './whatsApp'
export const messageQueue = new MessageQueue(messageRepository)
export const whatsAppController = new WhatsAppController(instanceRepository, messageQueue)
initialInstance(instanceRepository, whatsAppController)
  .catch(error => {
    console.log(error)
  })
