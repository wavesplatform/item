import React from 'react'
import { Flex } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { Icon } from '@item-protocol/ui'

export const Footer = () => (
  <Flex variant='footer'>
    <Flex
      sx={{
        alignItems: 'center',
        height: '100%',
        ml: 'lg',
        opacity: 0.5,
        '&:hover': {
          opacity: 1,
        },
      }}>
      <RouterLink to={'/'}>
        <Icon glyph={'layers'} fontSize={32} />
      </RouterLink>
    </Flex>
  </Flex>
)
