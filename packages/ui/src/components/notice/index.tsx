import React, { MouseEventHandler } from 'react'
import { ToastProps, Toast } from '../toasts'
import { IconProps, Icon } from '../icon'
import { Flex, Box } from 'rebass'

export function Notice({ notification, children, onClose, variant: toastVariant, sx, ...toastProps }: NoticeProps) {
  const { content, type = 'default' } = notification

  const variant = getVariant(type, toastVariant)
  const icon = getIcon(type, notification.icon)

  return (
    <Toast
      sx={{
        cursor: 'pointer',
        position: 'relative',
        ...sx,
      }}
      variant={variant}
      {...toastProps}>
      <Flex>
        {icon && <Icon mr={3} glyph={icon} fontSize='3em' />}
        <Box flex={1} alignSelf='center'>
          {children || content}
        </Box>
      </Flex>
      {typeof onClose === 'function' && <CloseButton onClose={onClose} />}
    </Toast>
  )
}

// #region utils
const CloseButton = ({ onClose }: CloseButtonProps) => (
  <Box
    onClick={onClose}
    sx={{
      position: 'absolute',
      top: 'sm',
      right: 'sm',
    }}>
    <Icon glyph='close' size='lg' />
  </Box>
)

function getVariant(type?: UINotificationType, variant?: NoticeProps['variant']) {
  const typeToVariantMapping: Record<UINotificationType, NoticeProps['variant']> = {
    default: 'default',
    error: 'danger',
    success: 'success',
    warn: 'warn',
  }
  const notificationVariant = typeToVariantMapping[type || 'default']
  return variant || notificationVariant
}

function getIcon(type?: UINotificationType, glyph?: UINotificationIcon) {
  const typeToGlyphMapping: Record<UINotificationType, UINotificationIcon> = {
    default: 'feedback',
    error: 'error',
    warn: 'warning',
    success: 'done',
  }
  const notificationGlyph = type && typeToGlyphMapping[type]
  return glyph || notificationGlyph
}

// #endregion

// #region types
export interface NoticeProps extends ToastProps {
  notification: UINotification
  onClose?: MouseEventHandler
}

export interface UINotification {
  type?: UINotificationType
  icon?: UINotificationIcon
  content?: string
}

interface CloseButtonProps extends Required<Pick<NoticeProps, 'onClose'>> {}

type UINotificationIcon = IconProps['glyph'] | null
export type UINotificationType = 'error' | 'warn' | 'success' | 'default'

// #endregion
