import React from 'react'
import { StyledButton, StyledButtonProps } from './style'
import { Icon } from '../icon'

export interface ButtonProps extends StyledButtonProps {
}

export const Button = ({ sx, ...rest }: ButtonProps) => (
  <StyledButton
    type={'button'}
    variant={'primary'}
    {...rest}
    sx={{
      px: 'md',
      py: 'sm',
      fontSize: 'body',
      borderRadius: 'md',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      cursor: rest.disabled ? 'default' : 'pointer',
      opacity: rest.disabled ? .5 : 1,
      ...sx,
    }}
  />
)

export interface IconButtonProps extends ButtonProps {
  glyph: string
}

export const IconButton = ({ glyph, sx, ...rest }: IconButtonProps) => (
  <Button
    {...rest}
    sx={{
      borderRadius: 'circle',
      fontSize: 'lg',
      p: 0,
      width: '40px',
      height: '40px',
      lineHeight: 0,
      ...sx,
    }}
  >
    <Icon glyph={glyph}/>
  </Button>
)
