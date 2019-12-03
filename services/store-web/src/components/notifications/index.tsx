import React from 'react'
import { Flex } from 'rebass'
import { useNotification, AppNotification } from '../../hooks/useNotification'
import { AppNotice } from './AppNotice'

export const Notifications = () => {
  const notificationsAPI = useNotification()
  if (!notificationsAPI) return null

  const { notifications, close } = notificationsAPI
  const remove = (id: AppNotification['id']) => close(id)

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
      {notifications.map(({ id, ...notification }) => {
        const handleClose = () => remove(id)
        return <AppNotice key={id} onClose={handleClose} notification={notification} />
      })}
    </Flex>
  )
}
