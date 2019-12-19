import React from 'react'
import { Flex } from 'rebass'
import { useNotification } from '../../hooks/useNotification'
import { Notice } from './notice'

export const Notifications = () => {
  const { notifications, close } = useNotification()

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
      {notifications.map(({ id, ...notification }) => (
        <Notice key={id} onClose={() => close(id)} notification={notification} />
      ))}
    </Flex>
  )
}
