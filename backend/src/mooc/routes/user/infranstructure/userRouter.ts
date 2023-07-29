import { Router } from 'express'
import { userControl } from './dependencies'
import { verifyAuthentication } from '../../../share/infranstructure/dependecies'
import RouterManager from '../../../share/infranstructure/routerManager'
const authRouter = Router()

const router = new RouterManager(authRouter)

router.post('/authentication', userControl.authentication)
router.get('/verifyAuthentication', verifyAuthentication.verify, userControl.verifyAuthentication)
router.put('/update', verifyAuthentication.verify, userControl.update)
router.get('/get', verifyAuthentication.verify, userControl.getUsers)
router.post('/resetPassword', userControl.sendResetPassword)
router.patch('/updatePassword', verifyAuthentication.verify, userControl.updatePassword)

export { authRouter }
