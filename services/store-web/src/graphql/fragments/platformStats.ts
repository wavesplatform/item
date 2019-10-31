import gql from 'graphql-tag'

export default gql`
  fragment platformStats on PlatformStats {
    dapps
    items
    transactions
  }
`
