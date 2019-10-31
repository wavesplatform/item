import React, { ChangeEvent, Component, ReactNode } from 'react'
import { TextInputWithIcon } from '@item/ui'

type TProps = {
  onSearch?: (searchString: string) => void
}

interface ISearchState {
  searchString?: string
}

interface SearchInputProps {
  defaultValue?: string,
  value?: any,
  placeholder?: string,
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
}

class Search extends Component<TProps> {
  state: ISearchState = {}

  render(): ReactNode {
    return (
      <SearchInput placeholder={'Search items ...'} onChange={this._onChangeSearchString}/>
    )
  }

  _onChangeSearchString = (ev: ChangeEvent<HTMLInputElement>) => {
    let searchString = ev.target.value
    if (searchString.length < 3) {
      searchString = ''
    }
    // ...

    const { onSearch } = this.props
    onSearch && onSearch(searchString)
  }
}

export default Search

const SearchInput = (props: SearchInputProps) =>
  <TextInputWithIcon
    {...props}
    glyph={'search'}
    variant={'input.flat'}
    size={'lg'}
  />
