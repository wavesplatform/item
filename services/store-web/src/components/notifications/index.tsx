import React from 'react'
import { Notice } from '@item-protocol/ui'
import { Flex } from 'rebass'
import { useNotification, AppNotification } from '../../hooks/useNotification'

export const Notifications = () => {
  const notificationsAPI = useNotification()
  if (!notificationsAPI) return null

  const { notifications, close } = notificationsAPI
  const handleRemove = (id: AppNotification['id']) => () => close(id)

  return (
    <Flex
      width={300}
      height='100wh'
      flexDirection='column-reverse'
      sx={{
        position: 'fixed',
        bottom: 'md',
        right: 'md',
      }}>
      {notifications.map(({ id, content, ...notification }) => {
        const notificationContent = typeof content === 'function' ? content(handleRemove(id)) : content

        return (
          <Notice
            key={id}
            notification={{ content: notificationContent, ...notification }}
            onClose={handleRemove(id)}
            duration={4200}
            onTimeoutEnd={handleRemove(id)}
            sx={{
              '&:not(:first-of-type)': {
                mb: 'sm',
              },
            }}
          />
        )
      })}
    </Flex>
  )
}
