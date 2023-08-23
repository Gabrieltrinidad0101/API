import MessagesApp from '../application/messages'
import { messageValidator } from './messagesValidation'
import { whatsAppController } from '../../../whatsAppControl/infranstructure/dependencies'
import MessagesControl from './messagesControl'
import { instanceRepository } from '../../instance/infranstructure/dependencies'
import { MessageRepository } from './Database/messageRepository'
const messagesApp = new MessagesApp(instanceRepository, messageValidator, whatsAppController)
export const messagesControl = new MessagesControl(messagesApp)
export const messageRepository = new MessageRepository()
