import { AppNotification } from './hooks/useNotification'
import { Resolvers } from 'apollo-client'
import { getNotifications } from './graphql/queries/getNotifications'

export const resolvers: Resolvers = {
  Mutation: {
    createNotification: (_, variables, { cache }) => {
      const { notifications }: GetNotificationQueryResult = cache.readQuery({
        query: getNotifications,
      })
      const data = {
        notifications: [...notifications, { ...variables.notification }],
      }
      cache.writeQuery({ query: getNotifications, data })
      return null
    },
    removeNotification: (_, variables, { cache }) => {
      const { notifications }: GetNotificationQueryResult = cache.readQuery({
        query: getNotifications,
      })
      const data = {
        notifications: notifications.filter(it => it.id !== variables.id),
      }
      cache.writeQuery({ query: getNotifications, data })
      return null
    },
  },
}

interface GetNotificationQueryResult {
  notifications: Array<AppNotification>
}
