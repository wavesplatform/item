import { Button, ButtonProps } from 'rebass'
import { borders, BordersProps, fontWeight, FontWeightProps, variant } from 'styled-system'
import styled from '@emotion/styled'
import { StyleSize } from '../../styles/theme'

const buttonSizeStyle = variant({
  prop: 'size',
  variants: {
    sm: {
      px: 'sm',
      py: 'xs',
      fontSize: 'sm',
    },
    md: {
      px: 'md',
      py: 'sm',
      fontSize: 'body',
    },
    lg: {
      px: 'lg',
      py: 'md',
      fontSize: 'body',
    },
  },
})

export type StyledButtonProps = Omit<ButtonProps, 'size'> & BordersProps & FontWeightProps & {
  size?: StyleSize
}

export const StyledButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'size',
})<StyledButtonProps>`
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  opacity: ${props => (props.disabled ? .5 : 1)};
  
  ${borders};
  ${fontWeight};
  ${buttonSizeStyle};
`