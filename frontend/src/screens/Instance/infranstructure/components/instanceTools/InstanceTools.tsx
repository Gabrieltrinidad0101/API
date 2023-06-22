import React from 'react'
import { Button } from '@mui/material'
import ToolsCss from './InstanceTools.module.css'
import type IProp from '../../../../../share/domian/prop'
import type IInstance from '../../../../../../../share/domain/instance'
import { instanceApp } from '../../dependencies'

export default function Tools ({ Prop: instance }: IProp<IInstance>): JSX.Element {
  const { _id, token } = instance

  const reStart = (): void => {
    instanceApp.restart(_id, token)
      .catch(error => {
        console.log(error)
      })
  }

  const logout = (): void => {
    instanceApp.logout(_id, token)
      .catch(error => {
        console.log(error)
      })
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
