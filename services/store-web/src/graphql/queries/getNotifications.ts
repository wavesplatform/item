import gql from 'graphql-tag'

export const getNotificationsQuery = gql`
  query getNotifications {
    notifications @client
  }
`
