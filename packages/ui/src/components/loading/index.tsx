import React, { PropsWithChildren } from 'react'
import { StyledLoading, StyledLoadingProps } from './style'
import Spinner from './spinner'
import { Text } from 'rebass'

export interface LoadingProps extends StyledLoadingProps {
}

export const Loading = (props: PropsWithChildren<LoadingProps>) => (
  <StyledLoading
    alignItems={'center'}
    flexDirection={'column'}
    justifyContent={'center'}
    px={'lg'}
    py={'lg'}
    {...props}
  >
    <Text color={'whites.5'}><Spinner size={32}/></Text>
    {props.children && <Text mt={'md'}>{props.children}</Text>}
  </StyledLoading>
)
