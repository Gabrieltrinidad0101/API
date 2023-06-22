import React from 'react'
import instanceAuthentication from '../../getInstanceAuthentication'
import Send from '../../../../../components/send/infranstructure/Send'

export default function SendMessage (): JSX.Element {
  const { _id, token } = instanceAuthentication()

  return (
    <Send Prop={{
      _id,
      token,
      title: 'Send Test Message',
      multiline: true,
      messagePlaceHolder: 'message',
      typeOfSend: 'document'
    }} />
  )
}
