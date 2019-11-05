import React from 'react'
import { generateAvatar } from '../../../helpers/avatar'
import { Avatar, AvatarProps } from './avatar'

export interface UserAvatarProps extends AvatarProps {
  address: string
  icon?: string
}

export const UserAvatar = ({ size, icon, address, ...rest }: UserAvatarProps) => {
  const imageUri = icon ? icon : generateAvatar(address)

  return (
    <Avatar
      size={size || 'sm'}
      src={imageUri}
      {...rest}
    />
  )
}