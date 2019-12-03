import React from 'react'
import { Notice, UINotification, NoticeProps } from '@item-protocol/ui'
import { Content } from '../../hooks/useNotification'

const NOTIFICATION_DURATION = 4200

export function AppNotice({ onClose, notification }: AppNoticeProps) {
  const { content, ...uiNotification } = notification
  const notificationContent = typeof content === 'function' ? content({ onClose }) : content

  return (
    <Notice
      notification={uiNotification}
      onClose={onClose}
      duration={NOTIFICATION_DURATION}
      sx={{
        '&:not(:first-of-type)': {
          mb: 'sm',
        },
      }}>
      {notificationContent}
    </Notice>
  )
}

export interface AppNoticeProps {
  onClose: NonNullable<NoticeProps['onClose']>
  notification: Omit<UINotification, 'content'> & { content: Content }
}
