import gql from 'graphql-tag'

export const getNotifications = gql`
  query getNotifications {
    notifications @client
  }
`
