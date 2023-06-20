import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import SendMessage from '../../../components/sendMessage/infranstructure/SendMessage'
import DocumentionCss from './Documentation.module.css'
import { type IInstanceAuthentication } from '../../../../../share/domain/instance'
import { Toast } from '../../../share/infranstruture/toast'

export default function Documentation () {
  const [instanceAuthentication, setInstanceAuthentication] = useState<IInstanceAuthentication>({
    _id: localStorage.getItem('instanceId') ?? '',
    token: localStorage.getItem('instanceToken') ?? ''
  })

  const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target
    setInstanceAuthentication(prevState => ({ ...prevState, [name]: value }))
  }

  const saveIInstanceAuthentication = () => {
    localStorage.setItem('instanceId', instanceAuthentication._id)
    localStorage.setItem('instanceToken', instanceAuthentication.token)
    Toast.sucess('Save Success')
  }

  return (
    <Box sx={{ p: 2 }}>
      <div className={DocumentionCss.headerContainer}>
        <h1>Send File</h1>
        <div className={DocumentionCss.container}>
          <div className={DocumentionCss.inputsContainer}>
              <TextField variant='standard' name="_id" onChange={changeInput} value={instanceAuthentication?._id} label="Instance ID" />
              <TextField variant='standard' name="token" onChange={changeInput} value={instanceAuthentication?.token} label="Token" />
          </div>
          <div>
            <Button variant="contained" onClick={saveIInstanceAuthentication} >Save</Button>
          </div>
        </div>
      </div>
      <SendMessage Prop={{
        _id: instanceAuthentication._id,
        token: instanceAuthentication.token,
        title: 'Send Test File',
        multiline: false,
        messagePlaceHolder: 'url',
        typeOfSend: 'document'
      }} />
    </Box>
  )
}
