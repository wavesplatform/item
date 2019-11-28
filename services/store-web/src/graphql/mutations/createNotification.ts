import gql from 'graphql-tag'

export const createNotification = gql`
  mutation createNotification($notification: Notification!) {
    createNotification(notification: $notification) @client
  }
`
