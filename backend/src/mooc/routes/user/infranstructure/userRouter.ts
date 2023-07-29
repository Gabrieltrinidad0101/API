import { Router } from 'express'
import { userControl } from './dependencies'
import { verifyAuthentication } from '../../../share/infranstructure/dependecies'
import RouterManager from '../../../share/infranstructure/routerManager'
const authRouter = Router()

const router = new RouterManager(authRouter)

router.post('/authentication', userControl.authentication)
router.get('/verifyAuthentication', verifyAuthentication.user, userControl.verifyAuthentication)
router.put('/update', verifyAuthentication.user, userControl.update)
router.get('/get', verifyAuthentication.user, userControl.getUsers)
router.post('/resetPassword', userControl.sendResetPassword)
router.patch('/updatePassword', verifyAuthentication.user, userControl.updatePassword)

export { authRouter }
