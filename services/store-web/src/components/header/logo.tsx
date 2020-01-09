import React from 'react'
import { Flex, Heading, Text, BoxProps, Box } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { Icon } from '@item-protocol/ui'
import config from '../../config'

export const Logo = (props: BoxProps) => (
  <Box {...props}>
    <RouterLink to='/'>
      <Flex alignItems='center' height='100%'>
        <Icon glyph='layers' mr='xs' color='primary' fontSize='lg' />

        <Heading sx={{ fontSize: 'body', fontWeight: 'body' }}>
          <Text as='span' mr='xs'>
            Item Store
          </Text>

          <Text as='span' color={config.chainId === 'T' ? 'yellow' : 'grays.4'} fontSize='sm'>
            {config.chainId === 'T' ? 'Testnet' : 'Beta'}
          </Text>
        </Heading>
      </Flex>
    </RouterLink>
  </Box>
)
