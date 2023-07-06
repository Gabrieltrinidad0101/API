import { Router } from 'express'
import { userControl } from './dependencies'
import { verifyAuthentication } from '../../../share/infranstructure/dependecies'
import RouterManager from '../../../share/infranstructure/routerManager'
const authRouter = Router()

const router = new RouterManager(authRouter)

router.post('/authentication', userControl.authentication)
router.get('/verifyAuthentication', verifyAuthentication.verify, userControl.verifyAuthentication)
router.put('/update', verifyAuthentication.verify, userControl.update)

export { authRouter }
