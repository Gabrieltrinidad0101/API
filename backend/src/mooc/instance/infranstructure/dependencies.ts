import InstanceController from '../../whatsAppControl/infranstructure/whatsApp'
import Instance from '../application/instance'
import InstanceRepository from './Database/instanceRepository'
import InstanceControl from './instanceControl'
import { instanceValidator } from './instanceValidation'

const instanceRepository = new InstanceRepository()
const instanceController = new InstanceController(instanceRepository)
const instance = new Instance(instanceRepository, instanceValidator, instanceController)
export const instanceControl = new InstanceControl(instance)
