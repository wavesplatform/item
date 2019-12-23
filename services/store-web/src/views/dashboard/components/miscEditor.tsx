import React, { ReactNode, ChangeEvent } from 'react'
import { Button, TextInput, IconButton } from '@item-protocol/ui'
import { Flex, Box, BoxProps } from 'rebass'

export const MiscEditor = ({ children, onAdd, value, onChange, ...boxPropx }: MiscEditorProps) => {
  return (
    <Box {...boxPropx}>
      {children}
      <Box mb='md'>
        {value.map((miscItem, index, miscItems) => {
          const itemsBefore = miscItems.slice(0, index)
          const itemsAfter = miscItems.slice(index + 1)

          const handleRemove = () => onChange([...itemsBefore, ...itemsAfter])

          const updateField = (fieldName: keyof MiscItem) => (e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.currentTarget
            const updatedItem = { ...miscItem, [fieldName]: value }
            onChange([...itemsBefore, updatedItem, ...itemsAfter])
          }

          return <MiscListItem key={index} miscItem={miscItem} onRemove={handleRemove} onUpdate={updateField} />
        })}
      </Box>
      <Button variant='secondary' onClick={onAdd}>
        Add record
      </Button>
    </Box>
  )
}

const MiscListItem = ({ miscItem, onRemove, onUpdate }: MiscListItemProps) => {
  return (
    <Flex mt='sm'>
      <Box width={2 / 5}>
        <TextInput value={miscItem.key} onChange={onUpdate('key')} placeholder='Key' />
      </Box>
      <Flex ml='md' width={3 / 5} alignItems='center'>
        <TextInput value={miscItem.value} onChange={onUpdate('value')} placeholder='Value' flex={1} />
        <IconButton onClick={onRemove} opacity={0.5} ml='md' glyph='close' variant='secondary' height={34} width={34} />
      </Flex>
    </Flex>
  )
}

type MiscEditorProps = Omit<BoxProps, 'value' | 'onChange'> & {
  value: Array<MiscItem>
  onChange: (value: Array<MiscItem>) => void
  onAdd: () => void
  label?: ReactNode
}

interface MiscListItemProps {
  miscItem: MiscItem
  onUpdate: (fieldName: keyof MiscItem) => (e: ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}

// not sure where to put this one
export type MiscItem = {
  key: string
  value: string
}
