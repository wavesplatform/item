import React, { ChangeEvent } from 'react'
import { TextInputWithIcon } from '@item-protocol/ui'

type TProps = {
  defaultValue?: string
  onSearch?: (searchString: string) => void
}

export const Search = ({ defaultValue, onSearch }: TProps) => {
  const onChangeSearchString = (ev: ChangeEvent<HTMLInputElement>) => {
    let searchString = ev.target.value
    if (searchString.length < 3) {
      searchString = ''
    }
    // ...

    onSearch && onSearch(searchString)
  }

  return (
    <TextInputWithIcon
      placeholder={'Search all items...'}
      glyph={'search'}
      variant={'input.flat'}
      defaultValue={defaultValue}
      autoFocus={!!defaultValue}
      onChange={onChangeSearchString}
      mb={'md'}
    />
  )
}

export default Search
