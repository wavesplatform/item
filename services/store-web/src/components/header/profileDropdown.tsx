import React, { useContext, useEffect } from 'react'
import { Box } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { DropdownItem, DropdownList, Price, toWaves } from '@item/ui'
import styled from '@emotion/styled'
import { KeeperContext } from '../../contexts/keeper'
import { removeToken } from '../../helpers/auth'
import { useApolloClient } from '@apollo/react-hooks'

type TProps = {
  isShown?: boolean
  target?: any
  onClickOutside?: () => void
}

export const ProfileDropdown = (props: TProps) => {
  const { isShown, target, onClickOutside: onClickOutsideCb } = props
  const { publicState } = useContext(KeeperContext)
  const client = useApolloClient()
  const { account } = publicState

  useEffect(() => {
    const onClickOutside = (ev: MouseEvent) => {
      if (target && isShown && !target.contains(ev.target) && onClickOutsideCb) {
        onClickOutsideCb()
      }
    }

    document.addEventListener('click', onClickOutside)

    return (() => {
      document.removeEventListener('click', onClickOutside)
    })
  }, [onClickOutsideCb, isShown, target])

  return (
    <StyledProfileDropdown sx={{ display: isShown ? 'block' : 'none' }}>
      <DropdownList>
        {account && <DropdownItem sx={{ borderBottomWidth: '1px', borderBottomStyle: 'solid' }}>
          <Price value={toWaves(account.balance.available).toFixed(3)}/>
        </DropdownItem>}
        <RouterLink to={'/profile'}>
          <DropdownItem>Inventory</DropdownItem>
        </RouterLink>
        <RouterLink to={'/dashboard'}>
          <DropdownItem>Dashboard</DropdownItem>
        </RouterLink>
        <DropdownItem sx={{ cursor: 'pointer' }} onClick={async () => {
          removeToken()
          client.resetStore()
          client.cache.reset()
        }}>Logout
        </DropdownItem>
      </DropdownList>
    </StyledProfileDropdown>
  )
}

export default ProfileDropdown

const StyledProfileDropdown = styled(Box)`
  position: absolute;
  z-index: 99;
  width: 192px;
  right: 0;
`
