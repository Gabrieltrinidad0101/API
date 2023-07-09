import { Router } from 'express'
import { verifyAuthentication } from '../../../share/infranstructure/dependecies'
import RouterManager from '../../../share/infranstructure/routerManager'
import { paymentControl } from './dependecies'
const paymentRouter = Router()
const router = new RouterManager(paymentRouter)
router.post('/payment/createProduct', verifyAuthentication.verify, paymentControl.createProduct)
export { paymentRouter }
