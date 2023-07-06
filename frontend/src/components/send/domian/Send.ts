export interface IPropSend {
  _id: string
  token: string
  messagePlaceHolder: string
  title: string
  multiline: boolean
  typeOfSend: 'body' | 'document'
  showFileName: boolean | false
}
