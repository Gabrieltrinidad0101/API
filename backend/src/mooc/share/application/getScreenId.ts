import type IInstance from '../../../../../share/domain/instance'
import { type IIdTokenWhatsApp } from '../../whatsAppControl/domian/whatsAppController'

export const getScreenId = (instance: IInstance | IIdTokenWhatsApp): string => {
  const id = instance._id
  const token = instance.token  
  const screenId = `${id}${token}`.replace(/-/gm,"")
  return screenId
}
