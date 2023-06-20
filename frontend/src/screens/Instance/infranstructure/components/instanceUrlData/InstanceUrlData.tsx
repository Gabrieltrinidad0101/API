import React from 'react'
import type Prop from '../../../../../share/domian/prop'
import type IInstance from '../../../../../../../share/domain/instance'
import InstanceUrlDataCss from './InstanceUrlData.module.css'
import { serverUrl } from '../../../../../share/infranstruture/dependencies'
import { IconButton } from '@mui/material'

export default function InstanceUrlData ({ Prop: instance }: Prop<IInstance>): JSX.Element {
  const copy = (id: string) => {
    const element = document.getElementById(id)
    if (!(element instanceof HTMLInputElement)) return element
    navigator.clipboard.writeText(element.value)
      .then(() => {
        console.log('Text copied to clipboard')
      })
      .catch((error) => {
        console.error('Failed to copy text:', error)
      })
  }
  return (
    <div className={InstanceUrlDataCss.container}>
      <div className={InstanceUrlDataCss.section}>
        <div>Instance State</div>
        <div>{instance.status.toUpperCase()}</div>
      </div>
      <div className={InstanceUrlDataCss.section}>
        <div>Url Api</div>
        <div className={InstanceUrlDataCss.inputContainer}>
          <input type="text" id="url" value={`${serverUrl}/${instance._id ?? ''}`} disabled />
          <IconButton color="primary" onClick={() => copy('url')}>
            <i className="fa-regular fa-copy"></i>
          </IconButton>
        </div>
      </div>
      <div className={InstanceUrlDataCss.section}>
        <div>Instance Id</div>
        <div className={InstanceUrlDataCss.inputContainer}>
          <input type="text" id="instanceId" value={instance._id ?? ''} disabled />
          <IconButton color="primary" onClick={() => copy('instanceId')}>
            <i className="fa-regular fa-copy"></i>
          </IconButton>
        </div>
      </div>
      <div className={InstanceUrlDataCss.section}>
        <div>Token</div>
        <div className={InstanceUrlDataCss.inputContainer}>
          <input type="text" id="token" value={instance.token ?? ''} disabled />
          <IconButton color="primary" onClick={() => copy('token')}>
            <i className="fa-regular fa-copy"></i>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
