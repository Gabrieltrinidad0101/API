import { TextField } from '@mui/material'
import React, { useState } from 'react'
import type IInstance from '../../../../../../../share/domain/instance'
import { instanceApp } from '../../dependencies'
import type Prop from '../../../../../share/domian/prop'

export default function InstanceName ({ Prop: instance }: Prop<IInstance>): JSX.Element {
  const [instanceName, setInstanceName] = useState<string>(instance.name)

  const saveName = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.code !== 'Enter') return
    const newInstanceName = { ...instance, name: instanceName }
    instanceApp.saveName(newInstanceName)
      .catch(error => {
        console.log(error)
      })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setInstanceName(value)
  }

  return (
    <div>
      <TextField id="instanceName" className='w-100' value={ instanceName } onChange={onChange} onKeyDown={saveName} label="Instance Name" variant="standard" />
    </div>
  )
}
