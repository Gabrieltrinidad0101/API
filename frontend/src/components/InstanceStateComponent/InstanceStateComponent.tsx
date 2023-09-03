import React from 'react'
import InstanceStateComponentCss from './InstanceStateComponent.module.css'
import type Prop from '../../share/domian/prop'

export default function InstanceStateComponent ({ Prop: status }: Prop<unknown>): JSX.Element {
  return (
    <p className={`${InstanceStateComponentCss.baseStatus} ${InstanceStateComponentCss[status as string]}`}>{status as string}</p>

  )
}
