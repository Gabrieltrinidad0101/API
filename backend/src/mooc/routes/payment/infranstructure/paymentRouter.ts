import { Router } from 'express'
import RouterManager from '../../../share/infranstructure/routerManager'
import { paymentControl } from './dependecies'

const paymentRouter = Router()
const router = new RouterManager(paymentRouter)

router.get('/sucess', paymentControl.captureSubscription)
export { paymentRouter }
