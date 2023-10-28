import React, { useState } from 'react'
import InstanceCss from './InstanceActive.module.css'
import type Prop from '../../../../../share/domian/prop'
import type IInstance from '../../../../../../../share/domain/instance'
import SendMessage from '../../../../../components/send/infranstructure/Send'
import { instanceApp } from '../../dependencies'
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { isEmptyNullOrUndefined } from '../../../../../../../share/application/isEmptyNullUndefiner'
import { Toast } from '../../../../../share/infranstruture/toast'
import { type IInstanceAuthentication } from '../../../../../../../share/domain/instance'
export default function InstanceActive ({ Prop: instance }: Prop<IInstance>): JSX.Element {
  const [webhookUrl, setWebhookUrl] = useState<string>(instance?.webhookUrl ?? '')

  const saveUrl = (): void => {
    if (isEmptyNullOrUndefined(webhookUrl)) { Toast.error('Webhook url is required'); return }
    instanceApp.saveWebhookUrl(instance?._id, webhookUrl)
      .catch(error => {
        console.log(error)
      })
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value } = e.target
    setWebhookUrl(value)
  }

  const getIdAndToken = (): IInstanceAuthentication => {
    return instance
  }

  return (
    <div className={InstanceCss.container}>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" >Url</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          onChange={inputChange}
          value={webhookUrl}
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" onClick={saveUrl} color="success" endIcon={<i className="fa-solid fa-floppy-disk"></i>}>
                Save
              </Button>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <SendMessage Prop={{
        getIdAndToken,
        multiline: true,
        title: 'Send Test Message',
        messagePlaceHolder: 'Message',
        typeOfSend: 'body',
        showFileName: false

      }} />
    </div>
  )
}
