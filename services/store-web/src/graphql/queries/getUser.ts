import gql from 'graphql-tag'
import userInfoFragment from '../fragments/userInfo'
import lotInfoFragment from '../fragments/lotInfo'
import itemInfoFragment from '../fragments/itemInfo'

export const getUserQuery = gql`
  query UserQuery($address: String!, $lotsCursorInfo: CursorInfo) {
    user(address: $address) {
      ...userInfo
      lots(cursorInfo: $lotsCursorInfo) {
        edges {
          cursor
          node {
            ...lotInfo
            item {
              ...itemInfo
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
  ${userInfoFragment}
  ${lotInfoFragment}
  ${itemInfoFragment}
`
