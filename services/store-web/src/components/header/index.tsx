import React, { useEffect, useRef, useState } from 'react'
import { Box, BoxProps, Flex, FlexProps, Heading, Link, Text } from 'rebass'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Route, RouteComponentProps } from 'react-router'
import { Container } from '../layout'
import { Icon, UserHeading } from '@item/ui'
import config from '../../config'
import styled from '@emotion/styled'
import useCurrentUser from '../../hooks/currentUser'
import ProfileDropdown from './profileDropdown'
import { IUser } from '@item/types'

type TProps = RouteComponentProps

export const Header = (props: TProps) => {
  const { me } = useCurrentUser()
  // const me = { address: '3N341VEEExcAt9FtSJ7taaUTCgGQpVbGS1Y' }

  return (
    <Box height={'52px'}>
      <Flex variant={'header'} height={'52px'} sx={{ left: 0, right: 0, top: 0 }}>
        <NavbarContainer>
          {/*Logo*/}
          <RouterLink to={'/'}>
            <Flex alignItems={'center'} height={'100%'}>
              {/*<LogoImage src={logo}/>*/}
              <Icon glyph={'layers'} mr={'xs'} color={'primary'} fontSize={'lg'}/>
              <Heading sx={{ fontSize: 'body', fontWeight: 'body' }}>
                <Text as={'span'} mr={'xs'}>Item Store</Text>
                {config.chainId === 'T'
                  ? <Text as={'span'} color={'yellow'} fontSize={'sm'}>Testnet</Text>
                  : <Text as={'span'} color={'grays.4'} fontSize={'sm'}>Beta</Text>}
              </Heading>
            </Flex>
          </RouterLink>
          {/*Menu*/}
          <Nav mx={'lg'}>
            <Route path={'/items'}>
              {({ match }) => (
                <RouterLink to={'/items'}>
                  <NavItem isActive={!!match}>
                    Browse
                  </NavItem>
                </RouterLink>
              )}
            </Route>
            <Link href={`${config.docsUrl}/guides/how-to-use.html`} target='_blank'>
              <NavItem>
                How to Use
              </NavItem>
            </Link>
          </Nav>
          {/*Profile*/}
          <Nav>
            {me ? (
              <ProfileItem sx={{ position: 'relative', height: '100%' }} user={me}/>
            ) : (
              <RouterLink to={'/signin'}>
                <NavItem>
                  Sign In
                </NavItem>
              </RouterLink>
            )}
          </Nav>
        </NavbarContainer>
      </Flex>
    </Box>
  )
}

export default Header

const ProfileItem = ({ user, ...rest }: { user: IUser } & BoxProps) => {
  const [dropdownActive, setDropdownActive] = useState(false)
  const history = useHistory()
  const profileDropRef = useRef()

  useEffect(() => {
    const unlisten = history.listen(() => setDropdownActive(false))
    return (() => unlisten())
  })

  return (
    <Box {...rest} ref={profileDropRef}>
      <ProfileToggle
        onClick={() => setDropdownActive(!dropdownActive)}
        isActive={dropdownActive}
      >
        <Icon glyph={dropdownActive ? 'expand_less' : 'expand_more'}/>
        <UserHeading user={user} ml={'xs'} flexDirection={'row-reverse'}/>
      </ProfileToggle>
      <ProfileDropdown
        isShown={dropdownActive}
        target={profileDropRef.current}
        onClickOutside={() => setDropdownActive(false)}
      />
    </Box>
  )
}

const NavItem = ({ isActive, sx, ...rest }: FlexProps & { isActive?: boolean }) =>
  <Flex
    tx={'navs'}
    variant={isActive ? 'itemActive' : 'item'}
    {...rest}
    sx={{
      alignItems: 'center',
      height: '100%',
      px: 'lg',
      ...sx,
    }}
  />

const ProfileToggle = ({ isActive, ...rest }: FlexProps & { isActive?: boolean }) =>
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

const NavbarContainer = styled(Container)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
`

const Nav = styled(Flex)`
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`