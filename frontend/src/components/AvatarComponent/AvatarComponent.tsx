import React from 'react'
import { type IIAvatar } from '../Dashboard/domian/Dashboard'
import { Avatar } from '@mui/material'

export function AvatarComponent (avatar: IIAvatar): JSX.Element {
  const name = avatar.name
  return <Avatar sx={{ width: avatar.width, height: avatar.height }} alt={name} onClick={() => avatar.onClick?.()} src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} />
}
