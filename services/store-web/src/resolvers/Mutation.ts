import { getNotificationsQuery } from '../graphql/queries/getNotifications'
import { ApolloClientOptions } from 'apollo-client'
import { Notification } from '../hooks/useNotification'

// TODO: change types to generated
export const Mutation = {
  pushNotification: (
    _: unknown,
    { notification }: { notification: Notification },
    { cache }: ApolloClientOptions<CacheNotifications>,
  ) => {
    const { notifications }: CacheNotifications = cache.readQuery({
      query: getNotificationsQuery,
    }) || { notifications: [] }
    const data = {
      notifications: [...notifications, { ...notification }],
    }
    cache.writeQuery({ query: getNotificationsQuery, data })
  },

  removeNotification: (_: unknown, variables: { id: number }, { cache }: ApolloClientOptions<CacheNotifications>) => {
    const { notifications }: CacheNotifications = cache.readQuery({
      query: getNotificationsQuery,
    }) || { notifications: [] }
    const data = {
      notifications: notifications.filter(it => it.id !== variables.id),
    }
    cache.writeQuery({ query: getNotificationsQuery, data })
  },
}

type CacheNotifications = { notifications: Array<Notification> }
