import React from 'react'
import { Button } from '@mui/material'
import ToolsCss from './InstanceTools.module.css'
import { customFecth } from '../../../../../share/infranstruture/dependencies'
import type IProp from '../../../../../share/domian/prop'
import type IInstance from '../../../../../../../share/domain/instance'

export default function Tools ({ Prop: instance }: IProp<IInstance>) {
  const reStart = async (): Promise<void> => {
    customFecth.post(`/${instance._id}/instance/restart`, { token: instance.token })
      .catch(error => { console.log(error) })
  }

  return (
        <div className={ToolsCss.container}>
            <Button variant="contained" startIcon={<i className="fa-solid fa-right-from-bracket"></i>}>
                WhatsApp Logout
            </Button>
            <Button variant="contained" onClick={reStart} startIcon={<i className="fa-solid fa-repeat"></i>}>
                Restart
            </Button>
        </div>
  )
}
