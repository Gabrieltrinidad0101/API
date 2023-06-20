import React, { useState } from 'react'
import { Toast } from '../../../share/infranstruture/toast'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { Box, Button, TextField } from '@mui/material'
import { instanceApp } from '../../../screens/Instance/infranstructure/dependencies'
import type IInstance from '../../../../../share/domain/instance'
import type Prop from '../../../share/domian/prop'
import SendMessageCss from './SendMessage.module.css'
import { type IToAndMessage } from '../../../../../share/domain/SendMessage'
import { type IPropSendMessage } from '../domian/SendMessage'

const SendMessage = ({ Prop: propSendMessage }: Prop<IPropSendMessage>): JSX.Element => {
  const [inputs, setInputsMessage] = useState<IToAndMessage>()
  const sendTestMessage = (): void => {
    const { to, body, filename } = inputs ?? { to: 0, body: '', filename: '' }
    if (isEmptyNullOrUndefined(to, body, filename) || isNaN(Number(to)) || to === 0) {
      Toast.error('Phone number and Message are required')
      return
    }

    instanceApp.sendTestMessage({
      _id: propSendMessage._id,
      token: propSendMessage.token,
      [propSendMessage.typeOfSend]: body,
      to,
      filename
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
        <h2>{propSendMessage?.title}</h2>
        <Button variant="contained" onClick={sendTestMessage} endIcon={<i className="fa-solid fa-paper-plane"></i>}>
          Send
        </Button>
      </div>
      <div className={SendMessageCss.containerInputs}>
        <div className={SendMessageCss.miniInput}>
          <TextField name="to" type="number" onChange={inputChange} label="Phone" variant="outlined" value={inputs?.to} />
          {
           !propSendMessage.multiline &&
            <TextField name="filename" type="text" onChange={inputChange} label="File Name" variant="outlined" value={inputs?.filename} className='ml-3'/>}
        </div>
        <div className={SendMessageCss.message}>
          <TextField id="outlined-basic"
            label={propSendMessage.messagePlaceHolder}
            name="body"
            multiline={propSendMessage.multiline}
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

export default SendMessage
