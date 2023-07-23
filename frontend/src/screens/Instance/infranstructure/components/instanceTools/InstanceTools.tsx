import React from 'react'
import { Button } from '@mui/material'
import ToolsCss from './InstanceTools.module.css'
import type IProp from '../../../../../share/domian/prop'
import type IInstance from '../../../../../../../share/domain/instance'
import { instanceApp } from '../../dependencies'
import { useUserContext } from '../../../../../share/infranstruture/AuthenticationContext'

export default function Tools ({ Prop: instance }: IProp<IInstance>): JSX.Element {
  const { _id, token } = instance
  const { user } = useUserContext()

  const reStart = (): void => {
    instanceApp.restart(_id, token)
      .catch(error => {
        console.log(error)
      })
  }

  const getRealStatus = (): void => {
    instanceApp.getRealStatus(_id, token)
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
      <div>
        {
          user.rol === 'admin' &&
          <Button variant="contained" onClick={getRealStatus} startIcon={<i className="fa-solid fa-check"></i>}>
            Real Status
          </Button>
        }
      </div>
      <div>
        <Button variant="contained" onClick={logout} startIcon={<i className="fa-solid fa-right-from-bracket"></i>}>
          WhatsApp Logout
        </Button>
        <Button variant="contained" onClick={reStart} startIcon={<i className="fa-solid fa-repeat"></i>}>
          Restart
        </Button>
      </div>
    </div>
  )
}
