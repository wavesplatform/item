import { Flex, FlexProps, Heading, HeadingProps, Text } from 'rebass'
import styled from '@emotion/styled'
import { truncate } from '../globals'

export type WrapperProps = Omit<FlexProps, 'size'>
export const Wrapper = styled(Flex)<WrapperProps>`
  align-items: center;
  min-width: 0;
`

export const Title = styled(Heading)<HeadingProps>`
  ${truncate};
`

export const Description = styled(Text)`
  opacity: .7;
`
