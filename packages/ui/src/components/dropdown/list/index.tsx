import React from 'react'
import { Box, BoxProps, Flex, FlexProps } from 'rebass'

export const DropdownList = ({ sx, ...rest }: FlexProps) =>
  <Flex
    tx={'dropdown'}
    variant={'list'}
    as={'ul'}
    {...rest}
    sx={{
      flexDirection: 'column',
      justifyContent: 'center',
      listStyle: 'none',
      overflow: 'hidden',
      p: 0,
      ...sx,
    }}
  />

export const DropdownItem = ({ sx, ...rest }: BoxProps) =>
  <Box
    tx={'dropdown'}
    variant={'item'}
    as={'li'}
    {...rest}
    sx={{
      py: 'md',
      px: 'lg',
      ...sx,
    }}
  />
