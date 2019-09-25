import React from 'react'
import { StyledButton, StyledButtonProps } from './style'
import { Icon } from '../icon'

type TButtonProps = StyledButtonProps

export const Button = (props: TButtonProps) => (
  // TODO: types problem with @emotion/core
  // see: https://github.com/rebassjs/rebass/issues/664
  // @ts-ignore
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

type TIconButtonProps = TButtonProps & {
  glyph: string
}

export const IconButton = ({ glyph, ...rest }: TIconButtonProps) => (
  // @ts-ignore
  <Button
    borderRadius={'circle'}
    px={0}
    py={0}
    fontSize={'lg'}
    width={'40px'}
    height={'40px'}
    lineHeight={0}
    {...rest}
  >
    <Icon glyph={glyph}/>
  </Button>
)
