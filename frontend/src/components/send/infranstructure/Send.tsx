import React, { useState } from 'react'
import { Toast } from '../../../share/infranstruture/toast'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { Button, TextField } from '@mui/material'
import { instanceApp } from '../../../screens/Instance/infranstructure/dependencies'
import type Prop from '../../../share/domian/prop'
import SendMessageCss from './Send.module.css'
import { type IToAndData } from '../../../../../share/domain/Send'
import { type IPropSend } from '../domian/Send'

const Send = ({ Prop: propSend }: Prop<IPropSend>): JSX.Element => {
  const [inputs, setInputsMessage] = useState<IToAndData>({ to: '', body: '', filename: '' })
  const sendTestMessage = (): void => {
    const { to, body, filename } = inputs

    if ((isEmptyNullOrUndefined(filename) && (propSend.showFileName ?? false)) ||
      isEmptyNullOrUndefined(to, body)) {
      Toast.error('All the fields are required')
      return
    }

    instanceApp.sendTestMessage({
      _id: propSend._id,
      token: propSend.token,
      [propSend.typeOfSend]: body,
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
        <h2>{propSend?.title}</h2>
        <Button variant="contained" onClick={sendTestMessage} endIcon={<i className="fa-solid fa-paper-plane"></i>}>
          Send
        </Button>
      </div>
      <div className={SendMessageCss.containerInputs}>
        <div className={SendMessageCss.miniInput}>
          <TextField name="to" type="text" onChange={inputChange} label="Phone" variant="outlined" value={inputs?.to} />
          {
            propSend.showFileName &&
            <TextField name="filename" type="text" onChange={inputChange} label="File Name" variant="outlined" value={inputs?.filename} className='ml-3' />
          }
        </div>
        <div className={SendMessageCss.message}>
          <TextField id="outlined-basic"
            label={propSend.messagePlaceHolder}
            name="body"
            multiline={propSend.multiline}
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

export default Send
