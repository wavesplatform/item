import { useQuery } from '@apollo/react-hooks'
import { getItemByAssetIdQuery } from '../../../graphql/queries/getItem'
import { Loading } from '@item-protocol/ui'
import ItemDetail from '../../../components/itemDetail'
import React from 'react'
import { Redirect } from 'react-router'
import { ItemQuery, ItemQueryVariables } from '../../../graphql/queries/__generated__/ItemQuery'
import { IItem } from '@item-protocol/types'

type TProps = {
  assetId: string
}

type TData = ItemQuery
type TVariables = ItemQueryVariables

export const Item = ({ assetId }: TProps) => {
  const { data, loading } = useQuery<TData, TVariables>(getItemByAssetIdQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      assetId,
    },
  })

  if (loading) {
    return <Loading/>
  }

  const item = data && data.item
  if (!item) {
    return <Redirect to={'/items'}/>
  }

  const { lots: lotsConnection, ...itemInfo } = item
  // Get only first 20 lots
  const lots =
    lotsConnection &&
    lotsConnection.edges &&
    lotsConnection.edges.length
      ? lotsConnection.edges.map(edge => edge.node)
      : []

  return <ItemDetail
    item={{ ...itemInfo, lots } as IItem}
    isPage={true}
  />
}

export default Item