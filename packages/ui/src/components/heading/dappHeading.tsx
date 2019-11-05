import React from 'react'
import { Description, Title, Wrapper, WrapperProps } from './style'
import { UserAvatar } from '../image'
import { IDapp } from '@item/types'
import { Box } from 'rebass'
import { StyleSize } from '../../styles'

export interface DappHeadingProps extends WrapperProps {
  dapp: IDapp
  size?: StyleSize
}

export const DappHeading = ({ dapp, size = 'md', ...rest }: DappHeadingProps) => {
  const meta = dapp.meta
  const isExtended = ['xl', 'lg'].includes(size)
  return (
    <Wrapper {...rest}>
      <UserAvatar
        icon={dapp.image && dapp.image.icon}
        address={dapp.address}
        size={size}
        mr={size}
      />
      <Box flex={'1'}>
        <Title
          as={'h1'}
          sx={{
            fontSize: size,
            fontWeight: 'body',
          }}
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
