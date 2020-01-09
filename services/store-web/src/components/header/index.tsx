import React from 'react'
import { Flex, FlexProps } from 'rebass'
import { ProfileMenu } from './profileMenu'
import { Logo } from './logo'
import { Navigation } from './navigation'

export const Header = () => {
  return (
    <Flex variant='header' pl='lg' alignItems='stretch' justifyContent='space-between'>
      <Logo display={['none', 'flex']} />
      <Navigation />
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
