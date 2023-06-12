import React, { useState } from 'react'
import { Toast } from '../../../../../share/infranstruture/toast'
import { isEmptyNullOrUndefined } from '../../../../../../../share/application/isEmptyNullUndefiner'
import { Button, TextField } from '@mui/material'
import { instanceApp } from '../../dependencies'
import type IInstance from '../../../../../../../share/domain/instance'
import type Prop from '../../../../../share/domian/prop'
import { type IToAndMessage } from '../../../domian/IInstance'
import SendMessageCss from './SendMessage.module.css'

export default function SendMessage ({ Prop: instance }: Prop<IInstance | undefined>): JSX.Element {
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

  const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setInputsMessage({ ...inputs, [name]: value })
  }

  return (
        <div className={SendMessageCss.containerSendMessage}>
            <div className={SendMessageCss.title}>
                <h2>Send Test Message</h2>
                <Button variant="contained" onClick={sendTestMessage} endIcon={<i className="fa-solid fa-paper-plane"></i>}>
                    Send
                </Button>
            </div>
            <div className={SendMessageCss.containerInputs}>
                <div className={SendMessageCss.phone}>
                    <TextField name="to" type="number" id="outlined-basic" onChange={inputChange} label="Phone" variant="outlined" value={inputs?.to} />
                </div>
                <div className={SendMessageCss.message}>
                    <TextField id="outlined-basic"
                        label="Message"
                        name="body"
                        multiline
                        rows={5}
                        value={inputs?.body}
                        fullWidth
                        onChange={inputChange}
                        variant="outlined"
                    />
                </div>
            </div>
        </div>
  )
}
