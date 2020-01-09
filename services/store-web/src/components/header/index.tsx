import React from 'react'
import { Flex, FlexProps, Link } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { Route } from 'react-router'
import config from '../../config'
import { ProfileMenu } from './profileMenu'
import { Logo } from './logo'

export const Header = () => {
  return (
    <Flex variant='header' pl='lg' alignItems='stretch' justifyContent='space-between'>
      <Logo />

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

      <ProfileMenu />
    </Flex>
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
