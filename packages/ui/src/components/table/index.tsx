import React from 'react'
import { Box, BoxProps, Flex, FlexProps } from 'rebass'

export const Table = ({ sx, ...rest }: FlexProps) =>
  <Box
    tx={'table'}
    variant={'container'}
    {...rest}
    sx={{
      width: 'inherit',
      ...sx,
    }}
  />

export const THead = (props: BoxProps) =>
  <Box
    tx={'table'}
    variant={'head'}
    {...props}
  />

export const TBody = (props: BoxProps) =>
  <Box
    tx={'table'}
    variant={'body'}
    {...props}
  />

export const Tr = ({ sx, ...rest }: BoxProps) =>
  <Flex
    tx={'table'}
    variant={'row'}
    {...rest}
    sx={{
      flexFlow: 'row wrap',
      ...sx,
    }}
  />

export const Td = ({ sx, ...rest }: BoxProps) =>
  <Flex
    tx={'table'}
    variant={'cell'}
    {...rest}
    sx={{
      fontWeight: 'inherit',
      textAlign: 'inherit',
      verticalAlign: 'middle',
      alignItems: 'center',
      ...sx,
    }}
  />