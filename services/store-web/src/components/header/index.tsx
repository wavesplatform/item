import React from 'react'
import { Flex, FlexProps, Heading, Link, Text } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { Route } from 'react-router'
import { Container } from '../layout'
import { Icon } from '@item-protocol/ui'
import config from '../../config'
import { ProfileItem } from './ProfileItem'

export const Header = () => {
  return (
    <Container variant='header' sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
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

      <Flex mx='lg'>
        <Route path='/items'>
          {({ match }) => (
            <RouterLink to='/items'>
              <NavItem isActive={!!match}>Browse</NavItem>
            </RouterLink>
          )}
        </Route>
        <Link href={`${config.docsUrl}/guides/how-to-use.html`} target='_blank'>
          <NavItem>How to Use</NavItem>
        </Link>
      </Flex>

      <ProfileItem sx={{ position: 'relative', height: '100%' }} />
    </Container>
  )
}

export const NavItem = ({ isActive, sx, ...rest }: FlexProps & { isActive?: boolean }) => (
  <Flex
    variant={isActive ? 'navs.itemActive' : 'navs.item'}
    {...rest}
    sx={{
      alignItems: 'center',
      height: '100%',
      px: 'lg',
      ...sx,
    }}
  />
)
