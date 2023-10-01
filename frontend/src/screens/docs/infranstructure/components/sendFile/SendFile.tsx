import React from 'react'
import Send from '../../../../../components/send/infranstructure/Send'
import instanceAuthentication from '../../getInstanceAuthentication'
import { type IInstanceAuthentication } from '../../../../../../../share/domain/instance'

export default function SendFile (): JSX.Element {
  const getIdAndToken = (): IInstanceAuthentication => {
    return instanceAuthentication()
  }

  return (
    <Send Prop={{
      getIdAndToken,
      title: 'Send Test File',
      multiline: false,
      messagePlaceHolder: 'url',
      typeOfSend: 'document',
      showFileName: true
    }} />
  )
}
