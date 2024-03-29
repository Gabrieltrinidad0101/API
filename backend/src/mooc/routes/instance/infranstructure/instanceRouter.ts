import { Router } from 'express'
import RouterManager from '../../../share/infranstructure/routerManager'
import { verifyAuthentication } from '../../../share/infranstructure/dependecies'
import { instanceControl } from './dependencies'

const instanceRouter = Router()
const router = new RouterManager(instanceRouter)

router.get('/findById/:_id', verifyAuthentication.user, instanceControl.findById)
router.get('/get', verifyAuthentication.user, instanceControl.get)
router.get('/:_id/instance/qr', instanceControl.getQr)
router.post('/:_id/instance/restart', instanceControl.restart)
router.post('/:_id/instance/logout', instanceControl.logout)
router.post('/:_id/instance/webhookUrl', verifyAuthentication.user, instanceControl.saveWebhookUrl)
router.post('/:_id/instance/name', verifyAuthentication.user, instanceControl.saveName)
router.get('/:_id/instance/realStatus', verifyAuthentication.user, instanceControl.getRealStatus)
router.post('/save', verifyAuthentication.user, instanceControl.save)
router.delete('/delete/:_id', verifyAuthentication.user, instanceControl.delete)
export { instanceRouter }
