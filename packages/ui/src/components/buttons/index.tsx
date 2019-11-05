import React from 'react'
import { StyledButton, StyledButtonProps } from './style'
import { Icon } from '../icon'

export interface ButtonProps extends StyledButtonProps {
}

export const Button = (props: ButtonProps) => (
  <StyledButton
    type={'button'}
    borderRadius={'md'}
    px={'md'}
    py={'sm'}
    fontSize={'body'}
    variant={'primary'}
    sx={{
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'transparent',
    }}
    {...props}
  >
    {props.children}
  </StyledButton>
)

export interface IconButtonProps extends ButtonProps {
  glyph: string
}

export const IconButton = ({ glyph, ...rest }: IconButtonProps) => (
  <Button
    borderRadius={'circle'}
    px={0}
    py={0}
    fontSize={'lg'}
    width={'40px'}
    height={'40px'}
    sx={{
      lineHeight: 0,
    }}
    {...rest}
  >
    <Icon glyph={glyph}/>
  </Button>
)
