import React from 'react'
import { Box, BoxProps } from 'rebass'
import { alignItems, AlignItemsProps, borders, BordersProps, variant } from 'styled-system'
import styled from '@emotion/styled'

export interface ToastProps extends BoxProps, BordersProps, AlignItemsProps {
  variant?: string
}

const toastStyle = variant({
  variants: {
    default: { backgroundColor: 'secondary' },
    info: { backgroundColor: 'info' },
    warn: { backgroundColor: 'warn' },
    danger: { backgroundColor: 'danger' },
    success: { backgroundColor: 'success' },
  },
})

const StyledToast = styled(Box)<ToastProps>`
  ${borders};
  ${alignItems};
  ${toastStyle};
`

export const Toast = ({ sx, ...rest }: ToastProps) =>
  <StyledToast
    variant={'default'}
    sx={{
      px: 'lg',
      py: 'md',
      borderRadius: 'md',
      alignItems: 'center',
      ...sx,
    }}
    {...rest}
  />
