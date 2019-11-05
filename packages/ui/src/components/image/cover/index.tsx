import React from 'react'
import { StyledImage, Wrapper, WrapperProps } from './style'

export interface CoverImageProps extends WrapperProps {
  src?: string
  editable?: boolean
}

export const CoverImage = ({ src, editable, ...rest }: CoverImageProps) => {
  const isEmpty = !src

  return (
    <Wrapper
      isEmpty={isEmpty}
      borderRadius={'lg'}
      sx={{
        bg: (isEmpty && editable) ? 'black' : 'grays.8',
        borderWidth: (isEmpty && editable) ? '2px' : 0,
        borderStyle: 'dashed',
        borderColor: 'grays.6',
      }}
      {...rest}
    >
      {src && <StyledImage src={src}/>}
    </Wrapper>
  )
}
