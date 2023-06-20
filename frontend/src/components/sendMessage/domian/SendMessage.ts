export interface IPropSendMessage {
  _id: string
  token: string
  messagePlaceHolder: string
  title: string
  multiline: boolean
  typeOfSend: 'body' | 'document'
}
