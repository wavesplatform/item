import gql from 'graphql-tag'

export default gql`
  fragment lotInfo on Lot {
    id
    txId
    priceAsset
    price
    total
    left
    cancelled
  }
`
