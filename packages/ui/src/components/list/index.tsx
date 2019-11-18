import React from 'react'
import { Box, BoxProps, Flex, FlexProps } from 'rebass'

export const List = ({ sx, ...rest }: FlexProps) =>
  <Flex
    tx={'list'}
    variant={'container'}
    as={'ul'}
    {...rest}
    sx={{
      flexDirection: 'column',
      justifyContent: 'center',
      listStyle: 'none',
      p: 0,
      ...sx,
    }}
  />

export interface ListItemProps extends BoxProps {
  isActive?: boolean
}

export const ListItem = ({ sx, isActive, ...rest }: ListItemProps) =>
  <Box
    tx={'list'}
    variant={[isActive ? 'itemActive' : 'item']}
    as={'li'}
    {...rest}
    sx={{
      p: 'lg',
      ...sx,
    }}
  />