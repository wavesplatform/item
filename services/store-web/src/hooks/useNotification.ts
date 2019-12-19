import { useQuery, useMutation } from '@apollo/react-hooks'
import { NoticeProps } from '@item-protocol/ui'
import { getNotificationsQuery } from '../graphql/queries/getNotifications'
import { removeNotificationMutation } from '../graphql/mutations/removeNotification'
import { pushNotificationMutation } from '../graphql/mutations/pushNotification'
import { ReactNode } from 'react'
import { INotification, NotificationType } from '@item-protocol/types'

export const useNotification: () => NotificationApi = () => {
  const { data } = useQuery<{ notifications: Array<Notification> }>(getNotificationsQuery)
  const notifications = data ? data.notifications : []

  const [pushNotification] = useMutation(pushNotificationMutation)
  const [removeNotification] = useMutation(removeNotificationMutation)

  const open: Open = (content, options = {}) => {
    pushNotification({
      variables: {
        notification: {
          __typename: 'Notification',
          id: Math.random(),
          content,
          ...options,
        },
      },
    })
  }

  const close = (id: NotificationId) => {
    removeNotification({ variables: { id } })
  }

  return { notifications, open, close, ...aliases(open) }
}

const aliases = (open: Open) => {
  const names: Array<NotificationType> = ['info', 'error', 'success', 'warn', 'default']
  return names.reduce(
    (aliases, name) => ({
      ...aliases,
      [name]: (content: Content, options: OpenOptions = {}) => open(content, { type: name, ...options }),
    }),
    {} as OpenAliases,
  )
}

type NotificationApi = {
  notifications: Array<Notification>
  open: Open
  close: (id: NotificationId) => void
} & OpenAliases

export type Notification = Omit<INotification, 'content'> & {
  __typename: 'Notification'
  id: NotificationId
  content: Content
}

type Open = (content: Content, options?: OpenOptions) => void
type OpenAliases = Record<NotificationType, Open>

interface OpenOptions extends Pick<INotification, 'type' | 'icon'> {}

export type Content = ReactNode | ((props: NotificationEvents) => ReactNode)

type NotificationEvents = Pick<NoticeProps, 'onClose'>
type NotificationId = number
