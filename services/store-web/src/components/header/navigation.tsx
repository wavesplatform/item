import React from 'react'
import { Link, Box, BoxProps } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { Route } from 'react-router'

import config from '../../config'
import { NavItem } from './index'

export const Navigation = () => <DesktopNavigation display={['none', 'flex']} />

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
