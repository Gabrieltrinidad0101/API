import MessagesApp from '../application/messages'
import { messageValidator } from './messagesValidation'
import { whatsAppController } from '../../whatsAppControl/infranstructure/dependencies'
import MessagesControl from './messagesControl'
const messagesApp = new MessagesApp(messageValidator, whatsAppController)
export const messagesControl = new MessagesControl(messagesApp)
