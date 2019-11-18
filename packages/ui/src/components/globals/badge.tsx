import React, { PropsWithChildren } from 'react'
import { Box, BoxProps } from 'rebass'
import styled from '@emotion/styled'
import { borders, BordersProps } from 'styled-system'

const StyledBadge = styled(Box)<BoxProps & BordersProps>`
  display: inline-block;
  line-height: 1;

  ${borders}
`

export const Badge = ({ sx, ...rest }: PropsWithChildren<BoxProps>) =>
  <StyledBadge
    as={'span'}
    {...rest}
    sx={{
      p: 'xs',
      bg: 'text',
      fontSize: 'sm',
      color: 'background',
      borderRadius: 'sm',
      ...sx,
    }}
  />

export default Badge