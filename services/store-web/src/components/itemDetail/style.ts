import { Box, Heading, Text } from 'rebass'
import styled from '@emotion/styled'
import { truncate } from '@item-protocol/ui'

export const StyledParamKey = styled(Heading)`
  ${truncate};
  
  min-width: 30%;
`

export const ParamValue = styled(Text)`
  text-align: right;
  word-break: break-all;
`

export const Overview = styled(Box)`
  position: relative;
`

export const ImageWrapper = styled(Box)`
  position: relative;
  transition: transform .1s ease-out;

  img {
    max-width: 100%;
    max-height: 360px;
    margin: 0 auto;
    height: auto;
    display: block;
  }
`