import type IInstanceRepository from '../../instance/domian/InstanceRepository'
import type IWhatsAppController from '../domian/whatsAppController'

export const initialInstance = (instanceRepository: IInstanceRepository, whatsAppController: IWhatsAppController): void => {
  instanceRepository.getAllInstance()
    .then(instances => {
      instances.forEach((instance) => {
        whatsAppController.start(instance, 'start')
          .catch(error => {
            console.log(error)
          })
      })
    })
    .catch(error => {
      console.log(error)
    })
}
