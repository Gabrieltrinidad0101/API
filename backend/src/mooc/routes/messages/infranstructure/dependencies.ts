import MessagesApp from '../application/messages'
import { messageValidator } from './messagesValidation'
import { whatsAppController } from '../../../whatsAppControl/infranstructure/dependencies'
import MessagesControl from './messagesControl'
import { instanceRepository } from '../../instance/infranstructure/dependencies'
const messagesApp = new MessagesApp(instanceRepository, messageValidator, whatsAppController)
export const messagesControl = new MessagesControl(messagesApp)
