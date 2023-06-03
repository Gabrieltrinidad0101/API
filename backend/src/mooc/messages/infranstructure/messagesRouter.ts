import { Router } from 'express'
import RouterManager from '../../share/infranstructure/routerManager'

const instanceRouter = Router()
const router = new RouterManager(instanceRouter)

router.post('/:_id/message/chat', )
export { instanceRouter }
