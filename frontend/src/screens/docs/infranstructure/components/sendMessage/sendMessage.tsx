import React from 'react'
import instanceAuthentication from '../../getInstanceAuthentication'
import Send from '../../../../../components/send/infranstructure/Send'
import { type IInstanceAuthentication } from '../../../../../../../share/domain/instance'

export default function SendMessage (): JSX.Element {
  const getIdAndToken = (): IInstanceAuthentication => {
    return instanceAuthentication()
  }

  return (
    <Send Prop={{
      getIdAndToken,
      title: 'Send Test Message',
      multiline: true,
      messagePlaceHolder: 'message',
      typeOfSend: 'body',
      showFileName: false
    }} />
  )
}
