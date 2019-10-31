import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'

export const getItemByAssetIdQuery = gql`
  query ItemQuery($assetId: String!) {
    item(assetId: $assetId) {
      ...itemInfo
    }
  }
  ${itemInfoFragment}
`
