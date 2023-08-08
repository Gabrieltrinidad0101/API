import React, { useState } from 'react'
import HeaderCss from './Header.module.css'
import { Button, TextField } from '@mui/material'
import { type IInstanceAuthentication } from '../../../../../../../share/domain/instance'
import { Toast } from '../../../../../share/infranstruture/toast'

export default function Header (): JSX.Element {
  const [instanceAuthentication, setInstanceAuthentication] = useState<IInstanceAuthentication>({
    _id: localStorage.getItem('instanceId') ?? '',
    token: localStorage.getItem('instanceToken') ?? ''
  })

  const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = e.target
    setInstanceAuthentication(prevState => ({ ...prevState, [name]: value }))
  }

  const saveIInstanceAuthentication = (): void => {
    localStorage.setItem('instanceId', instanceAuthentication._id)
    localStorage.setItem('instanceToken', instanceAuthentication.token)
    Toast.sucess('Save Success')
  }

  return (
        <div className={HeaderCss.headerContainer}>
            <h1>Send File</h1>
            <div className={HeaderCss.container}>
                <div className={HeaderCss.inputsContainer}>
                    <TextField variant='standard' name="_id" onChange={changeInput} value={instanceAuthentication?._id} label="Instance ID" />
                    <TextField variant='standard' name="token" onChange={changeInput} value={instanceAuthentication?.token} label="Token" />
                </div>
                <div>
                    <Button variant="contained" onClick={saveIInstanceAuthentication} >Save</Button>
                </div>
            </div>
        </div>
  )
}
