import React from 'react'
import { BigNumber } from '@waves/bignumber'
import { Box, BoxProps, Flex, Text } from 'rebass'
import styled from '@emotion/styled'
import { Icon } from '../icon'

type WrapperProps = BoxProps
const Wrapper = styled(Box)<BoxProps>`
  display: inline-block;
`

interface IProps extends Omit<WrapperProps, 'value'> {
  value: number | string | BigNumber
}

export const Price = ({ value, ...rest }: IProps) => {
  const valueBn = new BigNumber(value)

  return (
    <Wrapper {...rest}>
      <Flex alignItems={'center'}>
        <Text sx={{ lineHeight: 'heading' }} mr={'xs'}>{valueBn.toFixed()}</Text>
        <Icon glyph={'waves'} fontSize={'sm'}/>
      </Flex>
    </Wrapper>
  )
}

export default Price