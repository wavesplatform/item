import React, { useState } from 'react'
import { Button } from '@item-protocol/ui'

export const inclusionsMap = { sale: '' }
export type ItemInclusion = keyof typeof inclusionsMap

type TProps = {
  inclusions?: ItemInclusion[]
  onChange?: (inclusions: ItemInclusion[]) => void
}

export const Inclusions = (props: TProps) => {
  const { onChange } = props

  const [inclusions, setInclusions] = useState<ItemInclusion[]>(props.inclusions || [])

  const isSale = inclusions.includes('sale')
  const isAll = !inclusions.length

  const onChangeInclusion = (value: ItemInclusion) => {
    const isActive = inclusions.includes(value)

    const newInclusions = isActive
      // Remove
      ? inclusions.filter((inclusion, i) => (inclusion !== value))
      // Or Add
      : inclusions.concat([value])

    setInclusions(newInclusions)
    onChange && onChange(newInclusions)
  }

  const onChangeAll = () => {
    // Clear
    const newInclusions: ItemInclusion[] = []

    setInclusions(newInclusions)
    onChange && onChange(newInclusions)
  }

  return (
    <>
      <Button variant={isAll ? 'light' : 'secondary'}
              size={'sm'}
              onClick={onChangeAll}
              mr={'md'}>
        All
      </Button>
      <Button variant={isSale ? 'light' : 'secondary'}
              size={'sm'}
              onClick={() => onChangeInclusion('sale')}>
        For Sale
      </Button>
    </>
  )
}

export default Inclusions
