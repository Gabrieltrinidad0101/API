import React from 'react'
import instanceAuthentication from '../../getInstanceAuthentication'
import SendMessage from '../../../../../components/send/infranstructure/Send'

export default function SendFile (): JSX.Element {
  const { _id, token } = instanceAuthentication()
  return (
    <SendMessage Prop={{
      _id,
      token,
      title: 'Send Test File',
      multiline: false,
      messagePlaceHolder: 'url',
      typeOfSend: 'document',
      showFileName: true
    }} />
  )
}
