import React from 'react'
import { BigNumber } from '@waves/bignumber'
import styled from '@emotion/styled'
import { Icon } from '../icon'
import { Box, BoxProps, Flex, Text } from 'rebass'
import Badge from './badge'

type WrapperProps = BoxProps
const Wrapper = styled(Box)<BoxProps>`
  display: inline-block;
`

interface IProps extends Omit<WrapperProps, 'value'> {
  value: number | string | BigNumber
}

export const Quantity = ({ value, ...rest }: IProps) => {
  const valueBn = value && new BigNumber(value)

  if (!valueBn) {
    return (
      <>-</>
    )
  }

  if (valueBn.gt(1)) {
    return (
      <Wrapper {...rest}>
        <Flex alignItems={'center'}>
          <Text sx={{ lineHeight: 'heading' }} mr={'xs'}>{valueBn.toFixed()}</Text>
          <Icon glyph={'fiber_smart_record'} fontSize={'sm'}/>
        </Flex>
      </Wrapper>
    )
  }

  return (
    <Badge fontSize={'xs'} sx={{ textTransform: 'uppercase' }}>Uniq</Badge>
  )
}

export default Quantity