import type IInstance from '../../../../../share/domain/instance'

export const getClientId = (instance: IInstance): string | undefined => {
  const id = instance._id
  const token = instance.token
  if (id === undefined || token === undefined) return
  const clientId = `${id}${token}`
  return clientId
}
