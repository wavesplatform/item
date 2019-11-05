import gql from 'graphql-tag'

export default gql`
  fragment itemParamsInfo on ItemParams {
    txId
    name
    version
    imageUrl
    storageImageUrl
    misc
  }
`
