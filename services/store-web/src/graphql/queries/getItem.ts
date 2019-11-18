import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'
import lotInfoFragment from '../fragments/lotInfo'
import userInfoFragment from '../fragments/userInfo'

export const getItemByAssetIdQuery = gql`
  query ItemQuery($assetId: String!, $lotsCursorInfo: CursorInfo) {
    item(assetId: $assetId) {
      ...itemInfo
      lots(cursorInfo: $lotsCursorInfo) {
        edges {
          cursor
          node {
            ...lotInfo
            seller {
              ...userInfo
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${itemInfoFragment}
  ${lotInfoFragment}
  ${userInfoFragment}
`
