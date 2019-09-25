import React from 'react'
import { variant } from 'styled-system'
import { Box, BoxProps, Image } from 'rebass'
import styled from '@emotion/styled'
import { StyleSize } from '../../../styles/theme'

const avatarStyle = variant({
  prop: 'size',
  variants: {
    xs: { width: 16, height: 16 },
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
    xl: { width: 64, height: 64 },
  },
})

type WrapperProps = Omit<BoxProps, 'size'> & {
  size?: StyleSize
}
const Wrapper = styled(Box, {
  shouldForwardProp: prop => prop !== 'size',
})<WrapperProps>`
  border-radius: 50%;
  overflow: hidden;
  
  ${avatarStyle}
`

export interface AvatarProps extends WrapperProps {
  src?: string
}

const StyledAvatar = styled(Image)`
  max-width: none;
  display: block;
  height: 100%;
  width: 100%; 
`

export const Avatar = ({ src, size, ...rest }: AvatarProps) => {
  return (
    // @ts-ignore
    <Wrapper
      bg={'secondary'}
      // TODO: emotion styled is not working correctly
      // You can use Wrapper: ComponentType<TProps> as fix
      // @ts-ignore
      size={size || 'sm'}
      {...rest}
    >
      {src && <StyledAvatar src={src}/>}
    </Wrapper>
  )
}
