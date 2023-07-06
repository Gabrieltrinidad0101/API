import React from 'react'
import SendMessage from '../../../../../components/send/infranstructure/Send'
import instanceAuthentication from '../../getInstanceAuthentication'

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
