import { Router } from 'express'
import RouterManager from '../../../share/infranstructure/routerManager'
import { messagesControl } from './dependencies'
import { verifyAuthentication } from '../../../share/infranstructure/dependecies'
const messageRouter = Router()
const router = new RouterManager(messageRouter)
router.post('/:_id/messages/chat', messagesControl.send)
router.post('/:_id/messages/document', messagesControl.send)
router.post('/messages/queue', verifyAuthentication.user, messagesControl.queuedMessage)
export { messageRouter }
