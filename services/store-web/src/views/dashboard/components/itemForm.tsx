import React from 'react'
import { Box, Flex, Text } from 'rebass'
import { TextInput, Toggle, Button } from '@item-protocol/ui'
import { useState } from 'react'
import { IItem, ICreateItemParamsV1 } from '@item-protocol/types'
import BigNumber from '@waves/bignumber'
import { MiscEditor, MiscItem } from './miscEditor'
import { Container } from '../../../components/layout'
import { create } from '@item-protocol/provider'

export const ItemForm = ({ item }: ItemFormProps) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const EMPTY_ITEM = { key: '', value: '' }
  const [miscItems, setMiscItems] = useState<MiscItem[]>([EMPTY_ITEM])

  const isUnique = new BigNumber(quantity).eq(1)

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault()
    try {
      const newItem: ICreateItemParamsV1 = {
        name,
        imageUrl,
        quantity: parseInt(quantity, 10),
        misc: miscItems
          .filter(({ key }) => !!key)
          .reduce((result, { key, value }) => ({ ...result, [key]: value }), {}),
        version: 1,
      }

      await create(newItem).broadcast()
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

type ItemFormProps = {
  item?: IItem
}
