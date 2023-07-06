import type IInstanceRepository from './InstanceRepository'
import { type TypeValidation } from '../../../share/domain/Validator'
import type IWhatsAppController from '../../../whatsAppControl/domian/whatsAppController'

export default interface IInstanceContructor {
  instanceRepository: IInstanceRepository
  instanceValidator: TypeValidation
  urlValidator: TypeValidation
  whatsAppController: IWhatsAppController
}
