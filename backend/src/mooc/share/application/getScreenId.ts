import type IInstance from '../../../../../share/domain/instance'
import { type IScreenId } from '../../whatsAppControl/domian/whatsAppController'

export const getScreenId = (instance: IInstance | IScreenId): string => {
  return instance._id
}
