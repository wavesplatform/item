import React, { MouseEventHandler } from 'react'
import { Toast, ToastProps } from '../toasts'
import { Icon } from '../icon'
import { Box, Flex } from 'rebass'
import { IconButton, IconButtonProps } from '../buttons'
import { INotification, NotificationType } from '@item-protocol/types'

export interface NoticeProps extends ToastProps {
  notification: INotification
  onClose?: MouseEventHandler
}

export const Notice = (
  { notification, children, onClose, variant: overrideVariant, sx, ...rest }: NoticeProps,
) => {
  const { content, type = 'default', icon: overrideIcon } = notification
  const variant = overrideVariant || typeToVariant[type]
  const icon = overrideIcon === undefined ? typeToGlyph[type] : overrideIcon

  return (
    <Toast
      sx={{
        position: 'relative',
        ...onClose ? { pr: '42px' } : {},
        ...sx,
      }}
      variant={variant}
      {...rest}>
      <Flex>
        {icon &&
          <Box sx={{
            py: 'xs',
            mr: 'md',
          }}>
            <Icon glyph={icon} fontSize={'2em'} color={'whites.4'}/>
          </Box>
        }
        <Box flex={1} alignSelf='center'>
          {children || content}
        </Box>
      </Flex>
      {onClose && <CloseButton onClick={onClose} />}
    </Toast>
  )
}

const CloseButton = (props: Omit<IconButtonProps, 'glyph'>) => (
  <IconButton
    glyph={'close'}
    {...props}
    sx={{
      position: 'absolute',
      top: 'sm',
      right: 'sm',
      width: '28px',
      height: '28px',
      border: 0,
      fontSize: 'md',
      bg: 'whites.8',
      '&:hover': {
        bg: 'whites.7',
      },
    }}
  />
)

const typeToVariant: Record<NotificationType, string> = {
  default: 'default',
  info: 'info',
  error: 'danger',
  success: 'success',
  warn: 'warn',
}

const typeToGlyph: Record<NotificationType, string> = {
  default: 'feedback',
  info: 'warning',
  error: 'error',
  warn: 'warning',
  success: 'done',
}