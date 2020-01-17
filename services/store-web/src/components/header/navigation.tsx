import React, { useState, useEffect, useRef } from 'react'
import { Link, Box, BoxProps, Flex } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import { Route } from 'react-router'

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
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setVisible(false)
    }

    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  })

  return (
    <Box ref={ref} sx={{ alignItems: 'center' }} {...props}>
      <Icon
        ml='md'
        onClick={() => setVisible(!visible)}
        fontSize='xl'
        glyph={visible ? 'close' : 'menu'}
        sx={{ zIndex: 11 }}
      />

      <Flex
        flexDirection='column'
        fontSize='xl'
        p='xl'
        sx={{
          position: 'fixed',
          top: 0,
          left: visible ? 0 : '-100vw',
          bottom: 0,

          bg: 'dark',
          zIndex: 10,
        }}>
        <Logo onClick={() => setVisible(false)} my='xl' ml='sm' />

        <MenuItems onSelect={() => setVisible(false)} />
      </Flex>
    </Box>
  )
}

const MenuItems = ({ onSelect }: { onSelect?: () => void }) => {
  const handleClick = () => typeof onSelect === 'function' && onSelect()

  return (
    <>
      <Route path='/items'>
        {({ match }) => (
          <RouterLink to='/items'>
            <NavItem onClick={handleClick} isActive={!!match}>
              Browse
            </NavItem>
          </RouterLink>
        )}
      </Route>

      <Link href={`${config.docsUrl}/guides/how-to-use.html`} target='_blank'>
        <NavItem onClick={handleClick}>How to Use</NavItem>
      </Link>
    </>
  )
}
