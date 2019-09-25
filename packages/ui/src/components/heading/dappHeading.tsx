import React from 'react'
import { Description, Title, Wrapper, WrapperProps } from './style'
import { UserAvatar } from '../image'
import { IDapp } from '@item/types'
import { Box } from 'rebass'
import { StyleSize } from '../../styles'

interface IProps extends WrapperProps {
  dapp: IDapp
  size?: StyleSize
}

export const DappHeading = ({ dapp, size = 'md', ...rest }: IProps) => {
  const meta = dapp.meta
  const isExtended = ['xl', 'lg'].includes(size)
  return (
    // @ts-ignore
    <Wrapper {...rest}>
      <UserAvatar
        icon={dapp.image && dapp.image.icon}
        address={dapp.address}
        size={size}
        mr={size}
      />
      <Box>
        <Title
          as={'h1'}
          fontSize={size}
          fontWeight={'normal'}
          flex='1'
        >
          {dapp.name || dapp.address}
        </Title>
        {isExtended && meta && meta.description && <Description mt={'xs'}>
          {meta.description}
        </Description>}
      </Box>
    </Wrapper>
  )
}
