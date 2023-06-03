import { Router } from 'express'
import RouterManager from '../../share/infranstructure/routerManager'
import { verifyAuthentication } from '../../share/infranstructure/dependecies'
import { instanceControl } from './dependencies'

const instanceRouter = Router()
const router = new RouterManager(instanceRouter)

router.post('/save', verifyAuthentication.verify, instanceControl.save)
router.get('/findById/:_id', verifyAuthentication.verify, instanceControl.findById)
router.get('/get', verifyAuthentication.verify, instanceControl.get)
router.delete('/delete/:_id', verifyAuthentication.verify, instanceControl.delete)
router.get('/:_id/instance/qr', instanceControl.getQr)
export { instanceRouter }
