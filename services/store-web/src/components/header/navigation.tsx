import React from 'react'
import { Flex, Link } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { Route } from 'react-router'

import config from '../../config'
import { NavItem } from './index'

export const Navigation = () => (
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
)
