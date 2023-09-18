import { Router } from 'express'
import RouterManager from '../../../share/infranstructure/routerManager'
import { paymentControl } from './dependecies'
import { verifyAuthentication } from '../../../share/infranstructure/dependecies'

const paymentRouter = Router()
const router = new RouterManager(paymentRouter)

router.get('/sucess', paymentControl.captureSubscription)
router.get('/', verifyAuthentication.user, paymentControl.get)
router.post('/eventosControl', paymentControl.eventsControls)
export { paymentRouter }
