import React, { useEffect, useRef, useState } from 'react'
import { Box, BoxProps } from 'rebass'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Icon, UserHeading } from '@item-protocol/ui'

import { useCurrentUser } from '../../hooks/currentUser'
import { ProfileDropdown } from './profileDropdown'
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
    <Box sx={{ position: 'relative' }} ref={profileDropRef} {...props}>
      <NavItem
        onClick={() => setDropdownActive(!dropdownActive)}
        isActive={dropdownActive}
        sx={{
          cursor: 'pointer',
          borderLeft: ({ colors }) => `1px solid ${colors.secondary}`,
          borderRight: ({ colors }) => `1px solid ${colors.secondary}`,
        }}>
        <Icon glyph={dropdownActive ? 'expand_less' : 'expand_more'} />
        <UserHeading user={me} ml='xs' flexDirection='row-reverse' />
      </NavItem>

      <ProfileDropdown
        isShown={dropdownActive}
        target={profileDropRef.current}
        onClickOutside={() => setDropdownActive(false)}
      />
    </Box>
  )
}
