import { Box, BoxProps, Heading, HeadingProps } from 'rebass'
import { truncate } from '../globals'
import styled from '@emotion/styled'
import { borders, BordersProps } from 'styled-system'

export const StyledItemCard = styled(Box)<BoxProps & BordersProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  transition: background-color .2s ease-out;
  
  ${borders}
`

export const Title = styled(Heading)<HeadingProps>`
  ${truncate};
`

export const Overview = styled(Box)`
  height: 80%;
  position: relative;
`

export const ImageWrapper = styled(Box)`
  height: 80%;
  position: relative;
  padding-top: 80%;

  transition: transform .1s ease-out;
  
  ${StyledItemCard}:hover & {
    transform: scale(1.05);
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateZ(2deg);
    max-width: 100%;
    max-height: 100%;
    height: auto;
    display: block;
  }
`
