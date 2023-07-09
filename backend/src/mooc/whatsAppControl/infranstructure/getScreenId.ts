import type IInstance from '../../../../../share/domain/instance'
import { type IIdTokenWhatsApp } from '../domian/whatsAppController'

export const getScreenId = (instance: IInstance | IIdTokenWhatsApp): string | undefined => {
  const id = instance._id
  const token = instance.token
  if (id === undefined || token === undefined) return
  const screenId = `${id}${token}`
  return screenId
}
