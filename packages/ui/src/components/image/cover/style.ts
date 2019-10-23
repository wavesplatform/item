import { Box, BoxProps, Image } from 'rebass'
import { borders, BordersProps } from 'styled-system'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

export type WrapperProps = { isEmpty?: boolean } & BoxProps & BordersProps
export const Wrapper = styled(Box)<WrapperProps>`
  position: relative;
  height: 100%;
  overflow: hidden;
  
  ${borders}
  
  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  
  ${props => !props.isEmpty && css`
    &:before { background-image: linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.2) 100%); }
  `};
`

export const StyledImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: none;
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
`

