import React from 'react'
import { Title, Wrapper, WrapperProps } from './style'
import { IUser } from '@item-protocol/types'
import { UserAvatar } from '../image'
import { StyleSize } from '../../styles/theme'

export interface UserHeadingProps extends WrapperProps {
  user: IUser
  size?: StyleSize
}

export const UserHeading = ({ user, size = 'md', ...rest }: UserHeadingProps) => {
  const reversed = rest.flexDirection === 'row-reverse'
  return (
    <Wrapper {...rest}>
      <UserAvatar
        icon={user.image && user.image.icon}
        address={user.address}
        size={size}
        sx={{
          mr: reversed ? 0 : size,
          ml: reversed ? size : 0,
        }}
      />
      <Title
        as={'h2'}
        sx={{
          fontSize: size,
          flex: '1',
          fontWeight: 'body',
        }}
      >
        {user.name || user.address}
      </Title>
    </Wrapper>
  )
}
