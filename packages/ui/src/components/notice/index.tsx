import React, { MouseEventHandler, useState, useEffect } from 'react'
import { ToastProps, Toast } from '../toasts'
import { IconProps, Icon } from '../icon'
import { Flex, Box } from 'rebass'
import { debounceTime } from 'rxjs/operators'
import { Subject, Subscription } from 'rxjs'

export function Notice({
  notification,
  children,
  onClose,
  variant: toastVariant,
  sx,
  onTimeoutEnd,
  duration,
  ...toastProps
}: NoticeProps) {
  const { content, type = 'default' } = notification

  const { stopTimeout, restartTimeout } = useTimeoutWithHoverEffect(onTimeoutEnd, duration)

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
      onMouseEnter={stopTimeout}
      onMouseLeave={restartTimeout}
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

function useTimeoutWithHoverEffect(onTimeoutEnd: NoticeProps['onTimeoutEnd'], duration: NoticeProps['duration']) {
  const subject = new Subject()

  const isTimeoutUsing = typeof onTimeoutEnd === 'function' && duration && Number.isFinite(duration)

  const [timeoutSubscription, setTimeoutSubscription] = useState<Subscription>()
  const [isTimeoutActive, setIsTimeoutActive] = useState(isTimeoutUsing)

  const restartTimeout = () => {
    setIsTimeoutActive(true)
  }

  const stopTimeout = () => {
    setIsTimeoutActive(false)
  }

  useEffect(() => {
    if (isTimeoutActive && isTimeoutUsing) {
      const sub = subject.pipe(debounceTime(duration as number)).subscribe(onTimeoutEnd)
      setTimeoutSubscription(sub)
      return () => sub.unsubscribe()
    } else {
      if (timeoutSubscription) timeoutSubscription.unsubscribe()
    }

    /* 
      Adding onTimeoutEnd to dependencies array could lead to an unexpected behaviour.
      For example, if user render Notices by mapping an array of notifications,
      it is very likely that user sets `onTimeoutEnd` as a curried function, which gets some sort
      of identifier (id, index, etc). In that case the Notice always resets the timer
      for each instance in the map. 
      This problem could be solved by some sort of memoization in the user code, but
      this is not an option, since it reveals details of realization to user.
    */
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isTimeoutActive, duration])

  useEffect(() => {
    if (isTimeoutActive) subject.next()
  }, [isTimeoutActive, subject])

  return { restartTimeout, stopTimeout }
}

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
  onTimeoutEnd?: () => void
  duration?: number
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
