import React from 'react'
import { variant } from 'styled-system'
import styled from '@emotion/styled'
import { Glyph } from './glyph'
import { Box, BoxProps } from 'rebass'

const iconStyle = variant({
  variants: {
    baseline: { top: '-.05em', position: 'relative' },
  },
})

type WrapperProps = BoxProps
const Wrapper = styled(Box)<WrapperProps>`
  display: inline-block;
  position: relative;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  
  ${iconStyle};
`

export interface IconProps extends BoxProps {
  glyph: string
}

const StyledIcon = styled('svg')`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
`

export const Icon = ({ glyph, ...rest }: IconProps) => (
  <Wrapper {...rest}>
    <StyledIcon viewBox='0 0 32 32'>
      <title>{glyph}</title>
      <Glyph name={glyph}/>
    </StyledIcon>
  </Wrapper>
)
