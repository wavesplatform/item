import { useQuery, useMutation } from '@apollo/react-hooks'
import { UINotification, UINotificationType } from '@item-protocol/ui'
import { getNotifications } from '../graphql/queries/getNotifications'
import { removeNotification as removeNotificationMutation } from '../graphql/mutations/removeNotification'
import { createNotification as createNotificationMutation } from '../graphql/mutations/createNotification'
import { ReactNode } from 'react'

export const useNotification: () => AppNotificationApi = () => {
  const defaultData: NotificationQueryData = { notifications: [] }
  const { data = defaultData } = useQuery<NotificationQueryData>(getNotifications)

  const [createNotification] = useMutation(createNotificationMutation)
  const [removeNotification] = useMutation(removeNotificationMutation)

  const { notifications } = data
  const open: NotificationOpen = (content, options) =>
    createNotification({
      variables: {
        notification: {
          __typename: 'Notification',
          id: Math.random(),
          content,
          ...options,
        },
      },
    })
  const close = (id: NotificationId) => {
    removeNotification({ variables: { id } })
  }

  const aliasNames: Array<NotificationAliasesNames> = ['error', 'success', 'warn']

  const aliases = aliasNames.reduce((previous, aliasName) => {
    return {
      ...previous,
      [aliasName]: (context: ReactNode, options: NotificationOpenAliasOptions) =>
        open(context, { type: aliasName, ...options }),
    }
  }, {})

  return { notifications, open, close, ...(aliases as NotificatonAliases) }
}

// #region types
export interface AppNotification extends Omit<UINotification, 'content'> {
  __typename: 'Notification'
  id: NotificationId
  content: ReactNode | ((close: AppNotificationApi['close']) => ReactNode)
}
interface NotificationQueryData {
  notifications: Array<AppNotification>
}
type NotificationId = number

type NotificationOpen = (content: ReactNode, options: NotificationOpenOptions) => void
interface NotificationOpenOptions extends Pick<UINotification, 'type' | 'icon'> {}

type NotificationOpenAlias = (content: ReactNode, options: NotificationOpenAliasOptions) => void
interface NotificationOpenAliasOptions extends Pick<NotificationOpenOptions, 'icon'> {}

interface AppNotificationApi extends NotificatonAliases {
  open: NotificationOpen
  close: (id: NotificationId) => void
  notifications: Array<AppNotification>
}

type NotificationAliasesNames = Exclude<UINotificationType, 'default'>
interface NotificatonAliases extends Record<NotificationAliasesNames, NotificationOpenAlias> {}
// #endregion
