import { Router } from 'express'
import { verifyAuthentication } from '../../../share/infranstructure/dependecies'
import RouterManager from '../../../share/infranstructure/routerManager'
import { paymentControl } from './dependecies'
const paymentRouter = Router()
const router = new RouterManager(paymentRouter)
router.post('/payment/createProduct', verifyAuthentication.verify, paymentControl.createProduct)
router.post('/payment/createPlan', verifyAuthentication.verify, paymentControl.createPlan)
router.post('/payment/createSubscription', verifyAuthentication.verify, paymentControl.createSubscription)
router.get('/payment/cancel', paymentControl.test)
router.get('/payment/sucess', paymentControl.test)
export { paymentRouter }
