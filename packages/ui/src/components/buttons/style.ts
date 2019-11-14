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
  ${borders};
  ${fontWeight};
  ${buttonSizeStyle};
`