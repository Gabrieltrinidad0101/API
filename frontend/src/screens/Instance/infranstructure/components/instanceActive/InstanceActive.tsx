import React, { useState } from 'react'
import Code from '../../../../../components/code/Code'
import InstanceCss from './InstanceActive.module.css'
import { instanceApp } from '../../dependencies'
import type Prop from '../../../../../share/domian/prop'
import type IInstance from '../../../../../../../share/domain/instance'
import { type IToAndMessage } from '../../../domian/IInstance'
import { Toast } from '../../../../../share/infranstruture/toast'
import { isEmptyNullOrUndefined } from '../../../../../../../share/application/isEmptyNullUndefiner'

export default function InstanceActive ({ Prop: instance }: Prop<IInstance | undefined>): JSX.Element {
  const [inputs, setInputsMessage] = useState<IToAndMessage>()

  const sendTestMessage = (): void => {
    const { to, body } = inputs ?? { to: 0, body: '' }
    if (isEmptyNullOrUndefined(to, body) || isNaN(Number(to)) || to === 0) {
      Toast.error('Phone number and Message are required')
      return
    }

    instanceApp.sendTestMessage({
      _id: instance?._id,
      token: instance?.token,
      body,
      to
    }).catch(error => {
      console.log(error)
    })
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >): void => {
    const { name, value } = e.target
    setInputsMessage({ ...inputs, [name]: value })
  }

  return (
    <div className={InstanceCss.container}>
      <div className={InstanceCss.containerSendMessage}>
        <div className={InstanceCss.title}>
          <h2>Send Test Message</h2>
          <button className='btn-primary' onClick={sendTestMessage}>Send</button>
        </div>
        <div className={InstanceCss.containerInputs}>
          <div className={InstanceCss.phone}>
            <h3>Phone</h3>
            <input type="number" name="to" onChange={inputChange} />
          </div>
          <div className={InstanceCss.message}>
            <h3>Message</h3>
            <textarea name="body" rows={2} onChange={inputChange} ></textarea>
          </div>
        </div>
      </div>
      <div>
        <Code />
      </div>
    </div>
  )
}
