import React from 'react'
import { ItemQuery, ItemQueryVariables } from '../../../graphql/queries/__generated__/ItemQuery'
import { useQuery } from '@apollo/react-hooks'
import { getItemByAssetIdQuery } from '../../../graphql/queries/getItem'
import { Loading } from '@item/ui'
import { NullState } from '@item/ui'
import ItemDetail from '../../../components/itemDetail'

type TProps = {
  assetId: string
  onClose: () => void
}

type TData = ItemQuery
type TVariables = ItemQueryVariables

export const Item = ({ onClose, assetId }: TProps) => {
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
    return <NullState
      heading={'Item not found...'}
      message={'Maybe something broken :('}
    />
  }

  return <ItemDetail
    item={item}
    isPage={false}
    onClose={onClose}
  />
}

export default Item
