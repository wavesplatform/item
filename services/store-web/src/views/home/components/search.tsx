import React, { ChangeEvent } from 'react'
import { TextInputWithIcon, TextInputWithIconProps } from '@item/ui'

type TProps = {
  onSearch?: (searchString: string) => void
}

export const Search = ({ onSearch }: TProps) => {
  const onChangeSearchString = (ev: ChangeEvent<HTMLInputElement>) => {
    let searchString = ev.target.value
    if (searchString.length < 3) {
      searchString = ''
    }
    // ...

    onSearch && onSearch(searchString)
  }

  return (
    <SearchInput placeholder={'Search items ...'} onChange={onChangeSearchString}/>
  )
}

export default Search

const SearchInput = (props: TextInputWithIconProps) =>
  <TextInputWithIcon
    {...props}
    glyph={'search'}
    variant={'input.flat'}
    size={'lg'}
  />
