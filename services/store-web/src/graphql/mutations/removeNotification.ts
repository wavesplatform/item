import gql from 'graphql-tag'

export const removeNotification = gql`
  mutation removeNotification($id: ID!) {
    removeNotification(id: $id) @client
  }
`