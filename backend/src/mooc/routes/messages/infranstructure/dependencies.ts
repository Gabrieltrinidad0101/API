import MessagesApp from '../application/messages'
import { messageValidator } from './messagesValidation'
import { whatsAppController } from '../../../whatsAppControl/infranstructure/dependencies'
import MessagesControl from './messagesControl'
import { instanceRepository } from '../../instance/infranstructure/Database/instanceRepository'
import { messageRepository } from './Database/messageRepository'
const messagesApp = new MessagesApp(
  instanceRepository,
  messageValidator,
  whatsAppController,
  messageRepository
)
export const messagesControl = new MessagesControl(messagesApp)
