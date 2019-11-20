import React from 'react'
import { Flex } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { Icon } from '@item-protocol/ui'

export const Footer = () =>
  <Flex
    variant={'footer'}
    sx={{
      height: '6rem',
      p: 'lg',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      flexWrap: 'wrap',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    }}
  >
    <Flex
      sx={{
        alignItems: 'center',
        height: '100%',
        ml: 'lg',
        opacity: .5,
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <RouterLink to={'/'}><Icon glyph={'layers'} fontSize={32}/></RouterLink>
    </Flex>
  </Flex>