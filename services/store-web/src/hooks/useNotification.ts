import { useQuery, useMutation } from '@apollo/react-hooks'
import { UINotification, UINotificationType, NoticeProps } from '@item-protocol/ui'
import { getNotifications } from '../graphql/queries/getNotifications'
import { removeNotification as removeNotificationMutation } from '../graphql/mutations/removeNotification'
import { createNotification as createNotificationMutation } from '../graphql/mutations/createNotification'
import { ReactNode } from 'react'

export const useNotification: () => AppNotificationApi = () => {
  const { data = { notifications: [] } } = useQuery<NotificationQueryData>(getNotifications)

  const [createNotification] = useMutation(createNotificationMutation)
  const [removeNotification] = useMutation(removeNotificationMutation)

  const { notifications } = data
  const open: OpenNotification = (content, options) =>
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

  const aliases = aliasNames.reduce((preparedAliases, aliasName) => {
    return {
      ...preparedAliases,
      [aliasName]: (context: ReactNode, options: OpenAliasOptions) => open(context, { type: aliasName, ...options }),
    }
  }, {})

  return { notifications, open, close, ...(aliases as OpenAliases) }
}

// #region types
export interface AppNotification extends Omit<UINotification, 'content'> {
  __typename: 'Notification'
  id: NotificationId
  content: Content
  autoClose?: boolean
}

interface AppNotificationApi extends NotificationActions, OpenAliases {
  notifications: Array<AppNotification>
}

type OpenNotification = (content: Content, options?: OpenOptions) => void
type OpenNotificationAlias = (content: Content, options?: OpenAliasOptions) => void

interface OpenOptions extends Pick<UINotification, 'type' | 'icon'> {}
interface OpenAliasOptions extends Pick<OpenOptions, 'icon'> {}

interface NotificationActions {
  open: OpenNotification
  close: (id: NotificationId) => void
}

type NotificationAliasesNames = Exclude<UINotificationType, 'default'>
interface OpenAliases extends Record<NotificationAliasesNames, OpenNotificationAlias> {}

interface NotificationQueryData {
  notifications: Array<AppNotification>
}

type NotificationId = number
export type Content = ReactNode | ((props: ContentRenderProps) => ReactNode)

interface ContentRenderProps {
  onClose: NoticeProps['onClose']
}
// #endregion
