import gql from 'graphql-tag'

export const pushNotificationMutation = gql`
  mutation pushNotification($notification: Notification!) {
    pushNotification(notification: $notification) @client
  }
`
