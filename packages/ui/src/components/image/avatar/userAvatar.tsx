import React from 'react'
import { generateAvatar } from '../../../helpers/avatar'
import { Avatar, AvatarProps } from './avatar'

interface IProps extends AvatarProps {
  address: string
  icon?: string
}

export const UserAvatar = ({ size, icon, address, ...rest }: IProps) => {
  const imageUri = icon ? icon : generateAvatar(address)

  return (
    // @ts-ignore
    <Avatar
      size={size || 'sm'}
      src={imageUri}
      {...rest}
    />
  )
}