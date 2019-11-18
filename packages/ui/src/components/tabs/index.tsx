import React from 'react'
import { BoxProps, Flex, FlexProps } from 'rebass'

export const TabsList = ({ sx, ...rest }: FlexProps) =>
  <Flex
    tx={'tabs'}
    variant={'container'}
    as={'ul'}
    {...rest}
    sx={{
      alignItems: 'scretch',
      flexWrap: 'wrap',
      listStyle: 'none',
      p: 0,
      m: 0,
      ...sx,
    }}
  />

export interface TabsItemProps extends BoxProps {
  isActive?: boolean
}

export const TabsItem = ({ sx, isActive, ...rest }: TabsItemProps) =>
  <Flex
    tx={'tabs'}
    variant={[isActive ? 'itemActive' : 'item']}
    as={'li'}
    {...rest}
    sx={{
      cursor: 'pointer',
      alignItems: 'center',
      height: '100%',
      px: 'lg',
      ...sx,
    }}
  />
