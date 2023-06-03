import { Router } from 'express'
import { authControl } from './dependencies'
import { verifyAuthentication } from '../../share/infranstructure/dependecies'
import RouterManager from '../../share/infranstructure/routerManager'
const authRouter = Router()

const router = new RouterManager(authRouter)

router.post('/authentication', authControl.authentication)
router.get('/verifyAuthentication', verifyAuthentication.verify, authControl.verifyAuthentication)

export { authRouter }
