import React, { useState } from 'react'
import { Link, Box, BoxProps, Flex } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { Route } from 'react-router'
import { transparentize } from 'polished'

import config from '../../config'
import { NavItem } from './index'

export const Navigation = () => (
  <>
    <DesktopNavigation display={['none', 'flex']} />
    <MobileNavigation display={['flex', 'none']} />
  </>
)

const DesktopNavigation = (props: BoxProps) => (
  <Box mx='lg' {...props}>
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
  </Box>
)

const MobileNavigation = (props: BoxProps) => {
  const [visible, setVisible] = useState(true)

  return (
    <Flex
      onClick={() => setVisible(false)}
      flexDirection='column'
      alignItems='center'
      py='xl'
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

        bg: theme => transparentize(0.1, theme.colors.dark),
        visibility: visible ? 'visible' : 'hidden',
        zIndex: 10,
      }}
      {...props}>
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
  )
}
