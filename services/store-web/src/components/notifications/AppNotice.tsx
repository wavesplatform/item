import React, { useState, useEffect } from 'react'
import { Notice, UINotification, NoticeProps } from '@item-protocol/ui'
import { Content } from '../../hooks/useNotification'
import { Subject, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

export function AppNotice({ onClose, notification }: AppNoticeProps) {
  const { content, ...uiNotification } = notification
  const notificationContent = typeof content === 'function' ? content({ onClose }) : content

  const NOTIFICATION_DURATION = 4200
  const { restart, stop } = useDebounce(onClose as () => void, NOTIFICATION_DURATION)

  return (
    <Notice
      notification={uiNotification}
      onClose={onClose}
      onMouseEnter={stop}
      onMouseLeave={restart}
      sx={{
        '&:not(:first-of-type)': {
          mb: 'sm',
        },
      }}>
      {notificationContent}
    </Notice>
  )
}

function useDebounce(onTimeoutEnd: () => void, duration: number) {
  const subject = new Subject()

  const [timeoutSubscription, setTimeoutSubscription] = useState<Subscription>()
  const [isTimeoutActive, setIsTimeoutActive] = useState(true)

  const restart = () => {
    setIsTimeoutActive(true)
  }

  const stop = () => {
    setIsTimeoutActive(false)
  }

  useEffect(() => {
    if (isTimeoutActive) {
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

  return { restart, stop }
}

interface AppNoticeProps {
  onClose: NonNullable<NoticeProps['onClose']>
  notification: Omit<UINotification, 'content'> & { content: Content }
}
