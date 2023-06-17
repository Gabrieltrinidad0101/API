import React from 'react'
import { Button } from '@mui/material'
import ToolsCss from './InstanceTools.module.css'
import { customFecth } from '../../../../../share/infranstruture/dependencies'
import type IProp from '../../../../../share/domian/prop'
import type IInstance from '../../../../../../../share/domain/instance'
import API from '../../../../../share/application/Api'
export default function Tools ({ Prop: instance }: IProp<IInstance>) {
  const reStart = async (): Promise<void> => {
    customFecth.post(API.restartInstance(instance._id), { token: instance.token })
      .catch(error => { console.log(error) })
  }

  const logout = async (): Promise<void> => {
    customFecth.post(API.logoutInstance(instance._id), { token: instance.token })
      .catch(error => { console.log(error) })
  }

  return (
        <div className={ToolsCss.container}>
            <Button variant="contained" onClick={logout} startIcon={<i className="fa-solid fa-right-from-bracket"></i>}>
                WhatsApp Logout
            </Button>
            <Button variant="contained" onClick={reStart} startIcon={<i className="fa-solid fa-repeat"></i>}>
                Restart
            </Button>
        </div>
  )
}
