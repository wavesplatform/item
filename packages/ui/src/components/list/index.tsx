import React from 'react'
import { Box, BoxProps, Flex, FlexProps } from 'rebass'

export const List = ({ sx, ...rest }: FlexProps) =>
  <Flex
    tx={'list'}
    variant={'default'}
    as={'ul'}
    {...rest}
    sx={{
      flexDirection: 'column',
      justifyContent: 'center',
      listStyle: 'none',
      overflow: 'hidden',
      borderColor: 'grays.7',
      borderStyle: 'solid',
      borderWidth: '1px',
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
      borderColor: 'grays.7',
      borderStyle: 'solid',
      '&:first-of-type': {
        borderWidth: 0,
      },
      ...sx,
    }}
  />
