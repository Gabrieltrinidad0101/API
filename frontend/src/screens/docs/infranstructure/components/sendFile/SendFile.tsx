import React from 'react'
import SendMessage from '../../../../../components/send/infranstructure/Send'

export default function SendFile (): JSX.Element {
  return (
    <SendMessage Prop={{
      title: 'Send Test File',
      multiline: false,
      messagePlaceHolder: 'url',
      typeOfSend: 'document',
      showFileName: true
    }} />
  )
}
