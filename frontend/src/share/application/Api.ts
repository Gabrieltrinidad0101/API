import { type ISearchInstance } from '../../../../share/domain/instance'
export default class API {
  static restartInstance = (instanceId: string): string => `/${instanceId}/instance/restart`
  static logoutInstance = (instanceId: string): string => `/${instanceId}/instance/logout`
  static saveInstance = ({ skip, limit, search }: ISearchInstance): string => `/get?skip=${skip}&limit=${limit}&search=${search}`
}
