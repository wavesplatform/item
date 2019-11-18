import React, { MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { Box, BoxProps } from 'rebass'
import { IconButton, IconButtonProps } from '../buttons'

export interface ModalProps extends BoxProps {
  isOpen?: boolean
  onClose?: () => void
  hideCloseButton?: boolean
  container?: Element | null
}

export const Modal = ({ isOpen, onClose, hideCloseButton, sx, children, container, ...rest }: ModalProps) => {
  const modal = <Box
    tx={'modal'}
    variant={'backdrop'}
    onClick={onClose}
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
      zIndex: 998,
      display: isOpen ? 'flex' : 'none',
    }}>
    <Box
      tx={'modal'}
      variant={'content'}
      onClick={(ev: MouseEvent) => {
        ev.stopPropagation()
      }}
      {...rest}
      sx={{
        width: '420px',
        overflow: 'visible',
        zIndex: 999,
        position: 'relative',
        m: 'auto',
        ...sx,
      }}>
      {!hideCloseButton && <CloseButton onClick={onClose}/>}
      {children}
    </Box>
  </Box>

  return container ? createPortal(modal, container) : modal
}

const CloseButton = (props: Omit<IconButtonProps, 'glyph'>) => (
  <IconButton
    glyph={'close'}
    variant={'secondary'}
    {...props}
    sx={{
      position: 'absolute',
      top: 0,
      right: '-52px',
    }}
  />
)
