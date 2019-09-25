import React from 'react'
import { Title, Wrapper, WrapperProps } from './style'
import { IUser } from '@item/types'
import { UserAvatar } from '../image'
import { StyleSize } from '../../styles/theme'

interface IProps extends WrapperProps {
  user: IUser
  size?: StyleSize
}

export const UserHeading = ({ user, size = 'md', ...rest }: IProps) => {
  return (
    // @ts-ignore
    <Wrapper {...rest}>
      <UserAvatar
        icon={user.image && user.image.icon}
        address={user.address}
        size={size}
        mr={size}
      />
      <Title
        as={'h2'}
        fontSize={size}
        fontWeight={'normal'}
        flex='1'
      >
        {user.name || user.address}
      </Title>
    </Wrapper>
  )
}
