import WhatsAppController from '../../../whatsAppControl/infranstructure/whatsApp'
import Instance from '../application/instance'
import InstanceRepository from './Database/instanceRepository'
import InstanceControl from './instanceControl'
import { instanceValidator, urlValidator } from './instanceValidation'
export const instanceRepository = new InstanceRepository()
const whatsAppController = new WhatsAppController(instanceRepository)
const instance = new Instance({ instanceRepository, instanceValidator, urlValidator, whatsAppController })
export const instanceControl = new InstanceControl(instance)
