import gql from 'graphql-tag'

export default gql`
  fragment dappInfo on User {
    id
    address
    name
    image
    meta
    totalItems
  }
`
