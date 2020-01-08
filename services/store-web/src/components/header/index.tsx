import React, { useEffect, useRef, useState } from 'react'
import { Box, BoxProps, Flex, FlexProps, Heading, Link, Text } from 'rebass'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Route } from 'react-router'
import { Container } from '../layout'
import { Icon, UserHeading } from '@item-protocol/ui'
import config from '../../config'
import styled from '@emotion/styled'
import useCurrentUser from '../../hooks/currentUser'
import ProfileDropdown from './profileDropdown'
import { IUser } from '@item-protocol/types'

export const Header = () => {
  const { me } = useCurrentUser()

  return (
    <Container variant='header'>
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

      <Nav mx='lg'>
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
      </Nav>

      <Nav>
        {me ? (
          <ProfileItem sx={{ position: 'relative', height: '100%' }} user={me} />
        ) : (
          <RouterLink to='/signin'>
            <NavItem>Sign In</NavItem>
          </RouterLink>
        )}
      </Nav>
    </Container>
  )
}

const ProfileItem = ({ user, ...rest }: { user: IUser } & BoxProps) => {
  const [dropdownActive, setDropdownActive] = useState(false)
  const history = useHistory()
  const profileDropRef = useRef()

  useEffect(() => {
    const unlisten = history.listen(() => setDropdownActive(false))
    return () => unlisten()
  })

  return (
    <Box {...rest} ref={profileDropRef}>
      <ProfileToggle onClick={() => setDropdownActive(!dropdownActive)} isActive={dropdownActive}>
        <Icon glyph={dropdownActive ? 'expand_less' : 'expand_more'} />
        <UserHeading user={user} ml='xs' flexDirection='row-reverse' />
      </ProfileToggle>
      <ProfileDropdown
        isShown={dropdownActive}
        target={profileDropRef.current}
        onClickOutside={() => setDropdownActive(false)}
      />
    </Box>
  )
}

const NavItem = ({ isActive, sx, ...rest }: FlexProps & { isActive?: boolean }) => (
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

const ProfileToggle = ({ isActive, ...rest }: FlexProps & { isActive?: boolean }) => (
  <NavItem
    {...rest}
    sx={{
      position: 'relative',
      cursor: 'pointer',
      borderLeft: '1px solid',
      borderRight: '1px solid',
      borderColor: 'grays.7',
    }}
  />
)

const Nav = styled(Flex)`
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`
