import React, { ReactNode, ChangeEvent } from 'react'
import { Button, TextInput, IconButton } from '@item-protocol/ui'
import { Flex, Box } from 'rebass'

export const MiscEditor = ({ label, onAdd, value, onChange }: MiscEditorProps) => {
  return (
    <>
      {label}
      <Box mb='md'>
        {value.map((miscItem, index, miscItems) => {
          const itemsBefore = miscItems.slice(0, index)
          const itemsAfter = miscItems.slice(index + 1)

          const handleRemove = () => onChange([...itemsBefore, ...itemsAfter])

          const updateMiscItem = (updatedMiscItem: Partial<MiscItem>) => {
            const updatedItem = { ...miscItem, ...updatedMiscItem }
            onChange([...itemsBefore, updatedItem, ...itemsAfter])
          }
          const handleUpdate = (fieldName: keyof MiscItem) => (e: ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.currentTarget.value
            updateMiscItem({ [fieldName]: inputValue })
          }

          return <MiscListItem key={index} miscItem={miscItem} onRemove={handleRemove} onUpdate={handleUpdate} />
        })}
      </Box>
      <Button onClick={onAdd}>Add record</Button>
    </>
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

interface MiscEditorProps {
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
type MiscItem = {
  key: string
  value: string
}
