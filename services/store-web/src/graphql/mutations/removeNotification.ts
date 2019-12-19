import gql from 'graphql-tag'

export const removeNotificationMutation = gql`
  mutation removeNotification($id: ID!) {
    removeNotification(id: $id) @client
  }
`