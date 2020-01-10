import React, { useState } from 'react'
import { Link, Box, BoxProps, Flex } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { Route } from 'react-router'
import { transparentize } from 'polished'

import config from '../../config'
import { NavItem } from './index'
import { Icon } from '@item-protocol/ui'
import { Logo } from './logo'

export const Navigation = () => (
  <>
    <DesktopNavigation display={['none', 'flex']} />
    <MobileNavigation display={['flex', 'none']} />
  </>
)

const DesktopNavigation = (props: BoxProps) => (
  <Box mx='lg' {...props}>
    <MenuItems />
  </Box>
)

const MobileNavigation = (props: BoxProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <Box sx={{ alignItems: 'center' }} {...props}>
      <Icon ml='md' onClick={() => setVisible(true)} fontSize='xl' glyph='menu' />

      <Flex
        onClick={() => setVisible(false)}
        flexDirection='column'
        fontSize='xl'
        py='xl'
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,

          bg: theme => transparentize(0.01, theme.colors.dark),
          visibility: visible ? 'visible' : 'hidden',
          zIndex: 10,
        }}>
        <Logo mb='xl' ml='sm' />

        <MenuItems />
      </Flex>
    </Box>
  )
}

const MenuItems = () => (
  <>
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
  </>
)
