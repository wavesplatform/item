import React from 'react'
import { Box, Flex, Text } from 'rebass'
import { TextInput, Toggle, Button } from '@item-protocol/ui'
import { useState } from 'react'
import { IItem } from '@item-protocol/types'
import BigNumber from '@waves/bignumber'
import { MiscEditor, MiscItem } from './miscEditor'
import { Container } from '../../../components/layout'
import { create, update } from '@item-protocol/provider'
import { RouteComponentProps } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'
import { getItemByAssetIdQuery } from '../../../graphql/queries/getItem'

export const ItemForm = (props: RouteComponentProps<{ assetId?: string }>) => {
  const assetId = props.match.params.assetId
  const { item, loading } = useItem(assetId)

  const redirect = () => props.history.push('/dashboard')

  if (loading) return null
  if (item) return <Form item={item} onSuccess={redirect} />
  return <Form onSuccess={redirect} />
}

const Form = ({ item, onSuccess }: { item?: IItem; onSuccess: () => void }) => {
  const [name, setName] = useState(defaultState(item).name)
  const [quantity, setQuantity] = useState(defaultState(item).quantity)
  const [imageUrl, setImageUrl] = useState(defaultState(item).imageUrl)
  const [miscItems, setMiscItems] = useState(defaultState(item).misc)

  const isUnique = new BigNumber(quantity).eq(1)

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault()
    try {
      const save = () =>
        item
          ? update({ name, imageUrl, misc: miscUtils.toMap(miscItems), version: 1, assetId: item.txId })
          : create({ name, imageUrl, misc: miscUtils.toMap(miscItems), version: 1, quantity: parseInt(quantity, 10) })

      await save().broadcast()
      onSuccess()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container as='form' maxWidth={512} onSubmit={handleSubmit}>
      <Flex>
        <TextInput
          value={name}
          onChange={({ currentTarget }) => setName(currentTarget.value)}
          placeholder='Sword of Pain'>
          Name
        </TextInput>

        <TextInput
          ml='md'
          value={quantity}
          onChange={({ currentTarget }) => setQuantity(currentTarget.value)}
          placeholder='100'
          disabled={!!item}>
          Quantity
        </TextInput>
      </Flex>

      <Box p='lg' my='lg' bg='grays.8' sx={{ borderRadius: 'lg' }}>
        <Toggle
          disabled={!!item}
          justifyContent='space-between'
          checked={isUnique}
          onChange={() => {
            setQuantity(isUnique ? '10' : '1')
          }}>
          Unique item (Non-fungible token)
        </Toggle>

        <Text as='p' color='grays.2' mb={0} mt='md'>
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries.
        </Text>
      </Box>

      <TextInput value={imageUrl} onChange={({ currentTarget }) => setImageUrl(currentTarget.value)}>
        Image URL
      </TextInput>

      <MiscEditor
        my='lg'
        value={miscItems}
        onAdd={() => setMiscItems(misc => [...misc, EMPTY_ITEM])}
        onChange={value => setMiscItems(value)}>
        Misc
      </MiscEditor>

      <Button variant='primary' type='submit' width={1}>
        Save
      </Button>
    </Container>
  )
}

const EMPTY_ITEM = { key: '', value: '' }
const defaultState = (item?: IItem) => {
  const empty = {
    name: '',
    quantity: '',
    imageUrl: '',
    misc: [EMPTY_ITEM],
  }

  if (!item) return empty

  return {
    quantity: item.quantity ? item.quantity.toString() : empty.quantity,
    misc: item.params.misc ? miscUtils.toArray(item.params.misc) : [EMPTY_ITEM],
    name: item.params.name,
    imageUrl: item.params.imageUrl,
  }
}

const miscUtils = {
  toMap: (miscItems: MiscItem[]) =>
    miscItems.filter(({ key }) => !!key).reduce((result, { key, value }) => ({ ...result, [key]: value }), {}),
  toArray: (misc: Record<string, string>) => Object.entries(misc).map(([key, value]) => ({ key, value })),
}

const useItem = (assetId?: string) => {
  const [loadItem, { called, data, loading }] = useLazyQuery(getItemByAssetIdQuery, {
    variables: {
      assetId,
    },
  })
  if (assetId && !called) loadItem()
  return { item: data && data.item, loading }
}
