import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Flex } from 'rebass'
import { Notice, NoticeProps } from '..'
import { Button } from '../../buttons'

storiesOf('Notice', module).add('Types', () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    setNotifications(notifications => [...notifications, { ...notification, id: Math.random() }])
  }

  const notify = () => addNotification({ content: 'Notification' })
  const warn = () => addNotification({ content: 'Something went wrong', type: 'warn' })
  const error = () => addNotification({ content: 'Error has occurred! Try again', type: 'error' })
  const success = () => addNotification({ content: 'Hooray! Everything is great!', type: 'success' })
  const showMessage = () =>
    addNotification({
      icon: null,
      children: <Button onClick={() => console.info('hello')}>Say hello</Button>,
    })

  const removeNotification = (id: Notification['id']) =>
    setNotifications(notifications => notifications.filter(it => it.id !== id))

  return (
    <>
      <Box>
        <Button mr={2} onClick={notify}>
          Spawn notification
        </Button>
        <Button mx={2} variant='warn' onClick={warn}>
          Spawn warning
        </Button>
        <Button mx={2} variant='danger' onClick={error}>
          Spawn error message
        </Button>
        <Button mx={2} variant='success' onClick={success}>
          Spawn success message
        </Button>
        <Button mx={2} onClick={showMessage}>
          Spawn custom message
        </Button>
      </Box>

      <Flex
        flexDirection='column-reverse'
        width={350}
        sx={{
          position: 'fixed',
          bottom: 10,
          right: 10,
        }}>
        {notifications.map(it => (
          <Notice
            sx={{
              '&:not(:first-of-type)': {
                mb: 'sm',
              },
            }}
            key={it.id}
            notification={it}
            onClose={() => removeNotification(it.id)}
            onTimeoutEnd={() => removeNotification(it.id)}
            duration={4200}>
            {it.children}
          </Notice>
        ))}
      </Flex>
    </>
  )
})

type Notification = NoticeProps['notification'] & { id: number; children?: JSX.Element }
