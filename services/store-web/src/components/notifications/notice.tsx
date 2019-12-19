import React, { useState, useEffect } from 'react'
import { Notice as BaseNotice, NoticeProps as BaseNoticeProps } from '@item-protocol/ui'
import { Content } from '../../hooks/useNotification'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { INotification } from '@item-protocol/types'
import { useRef } from 'react'

const NOTIFICATION_DURATION = 4200

export const Notice = ({ onClose, notification }: NoticeProps) => {
  const { content, ...uiNotification } = notification
  const notificationContent = typeof content === 'function' ? content({ onClose }) : content

  const [delay, setDelay] = useState(NOTIFICATION_DURATION)
  useDelay(onClose, delay)

  return (
    <BaseNotice
      notification={uiNotification}
      onClose={onClose}
      onMouseEnter={() => setDelay(0)}
      onMouseLeave={() => setDelay(NOTIFICATION_DURATION)}
      sx={{
        '&:not(:first-of-type)': {
          mb: 'sm',
        },
      }}>
      {notificationContent}
    </BaseNotice>
  )
}

const useDelay = (delayedFn: Function, duration?: number) => {
  const savedCallback = useRef(delayedFn)

  useEffect(() => {
    if (duration) {
      const onEnd = () => savedCallback.current()

      const subject = new Subject()
      const sub = subject.pipe(debounceTime(duration)).subscribe(onEnd)
      subject.next()

      return () => sub.unsubscribe()
    }
  }, [duration])
}

interface NoticeProps {
  onClose: NonNullable<BaseNoticeProps['onClose']>
  notification: Omit<INotification, 'content'> & { content: Content }
}
