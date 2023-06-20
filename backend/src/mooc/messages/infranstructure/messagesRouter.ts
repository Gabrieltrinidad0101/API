import { Router } from 'express'
import RouterManager from '../../share/infranstructure/routerManager'
import { messagesControl } from './dependencies'
const messageRouter = Router()
const router = new RouterManager(messageRouter)
router.post('/:_id/messages/chat', messagesControl.sendMessage)
router.post('/:_id/messages/document', messagesControl.sendMessage)
export { messageRouter }
