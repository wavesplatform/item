import gql from 'graphql-tag'

export default gql`
  fragment itemParamsInfo on ItemParams {
    imageUrl
    storageImageUrl
    misc
  }
`
