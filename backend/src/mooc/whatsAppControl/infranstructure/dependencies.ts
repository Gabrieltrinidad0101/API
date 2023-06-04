import InstanceRepository from '../../instance/infranstructure/Database/instanceRepository'
import WhatsAppController from './whatsApp'
const instanceRepository = new InstanceRepository()
export const whatsAppController = new WhatsAppController(instanceRepository)

instanceRepository.getAllInstance()
  .then(instances => {
    instances.forEach((instance) => {
      whatsAppController.start(instance)
    })
  })
