import React, { useEffect, useRef, useState } from 'react'
import { Box, BoxProps, FlexProps } from 'rebass'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Icon, UserHeading } from '@item-protocol/ui'

import useCurrentUser from '../../hooks/currentUser'
import ProfileDropdown from './profileDropdown'
import { NavItem } from './index'

export const ProfileItem = (props: BoxProps) => {
  const { me } = useCurrentUser()

  const [dropdownActive, setDropdownActive] = useState(false)
  const history = useHistory()
  const profileDropRef = useRef()

  useEffect(() => {
    const unlisten = history.listen(() => setDropdownActive(false))
    return () => unlisten()
  })

  if (!me)
    return (
      <RouterLink to='/signin'>
        <NavItem>Sign In</NavItem>
      </RouterLink>
    )

  return (
    <Box {...props} ref={profileDropRef}>
      <ProfileToggle onClick={() => setDropdownActive(!dropdownActive)} isActive={dropdownActive}>
        <Icon glyph={dropdownActive ? 'expand_less' : 'expand_more'} />
        <UserHeading user={me} ml='xs' flexDirection='row-reverse' />
      </ProfileToggle>
      <ProfileDropdown
        isShown={dropdownActive}
        target={profileDropRef.current}
        onClickOutside={() => setDropdownActive(false)}
      />
    </Box>
  )
}

export const ProfileToggle = ({ isActive, ...rest }: FlexProps & { isActive?: boolean }) => (
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
