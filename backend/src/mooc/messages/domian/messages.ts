import { type IInstanceAuthentication } from '../../../../../share/domain/instance'
export interface ISendMessage extends IInstanceAuthentication {
  to?: string
  body?: string
}
