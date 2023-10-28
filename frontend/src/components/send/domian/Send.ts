import { type IInstanceAuthentication } from '../../../../../share/domain/instance'

export interface IPropSend {
  getIdAndToken: () => IInstanceAuthentication
  messagePlaceHolder: string
  title: string
  multiline: boolean
  typeOfSend: 'body' | 'document'
  showFileName: boolean | false
}
