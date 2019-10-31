import React, { PropsWithChildren } from 'react'
import { Box, BoxProps } from 'rebass'
import styled from '@emotion/styled'
import { borders, BordersProps } from 'styled-system'

const StyledBadge = styled(Box)<BoxProps & BordersProps>`
  display: inline-block;
  line-height: 1;

  ${borders}
`

export const Badge = (props: PropsWithChildren<BoxProps>) => (
  <StyledBadge
    as={'span'}
    p={'xs'}
    bg={'text'}
    fontSize={'sm'}
    color={'background'}
    borderRadius={'sm'}
    {...props}
  >
    {props.children}
  </StyledBadge>
)

export default Badge