import { Box, BoxProps, Card, Flex, Heading } from 'rebass'
import { truncate } from '../globals'
import styled from '@emotion/styled'
import { borders, BordersProps } from 'styled-system'

export const StyledDappCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  padding-top: 120%;
`

export const Title = styled(Heading)`
  ${truncate};
`

export const Overview = styled(Box)<BoxProps & BordersProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  
  ${borders};
  
  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-image: linear-gradient(to top,rgba(0,0,0,0.7) 20%,transparent 80%);
  }
`

export const Image = styled(Box)`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform .1s ease-out;
  
  ${StyledDappCard}:hover & {
    transform: scale(1.05);
  }
`

export const Inner = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`
