import { Skeleton } from '@mui/material'
import React from 'react'
import type Prop from '../../../../../share/domian/prop'
import { type TypeInstanceStateByComponent, type IInstanceStateControl } from '../../../domian/Instance'
import InstanceActive from '../instanceActive/InstanceActive'

type TypeInstanceStateControl = IInstanceStateControl<React.LegacyRef<HTMLDivElement>>

export default function InstanceStateControl ({ Prop: instanceStateControl }: Prop<TypeInstanceStateControl>): JSX.Element {
  const InstanceState: TypeInstanceStateByComponent<JSX.Element> = {
    pending: <div ref={instanceStateControl.qrRef}></div>,
    initial: <Skeleton
      variant="rectangular"
      width="100%"
      height="90%"
    />,
    authenticated: <InstanceActive Prop={instanceStateControl.instance} />
  }
  return InstanceState[instanceStateControl.instance.status]
}
