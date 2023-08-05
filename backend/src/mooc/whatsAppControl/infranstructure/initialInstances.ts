import type IInstanceRepository from '../../routes/instance/domian/InstanceRepository'
import type IWhatsAppController from '../domian/whatsAppController'

export const initialInstance = async (
  instanceRepository: IInstanceRepository,
  whatsAppController: IWhatsAppController
): Promise<void> => {
  try {
    const instances = await instanceRepository.find({ status: { $ne: 'unpayment' } })
    instances.forEach((instance) => {
      whatsAppController.start(instance, 'start')
        .catch(error => {
          console.log(error)
        })
    })
  } catch (error) {
    console.log(error)
  }
}
