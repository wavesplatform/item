import React, { useCallback, useEffect, useState } from 'react'
import { ViewContent, ViewGrid, ViewSide, ViewWrapper } from '../../components/layout'
import { useHistory, useLocation, useRouteMatch } from 'react-router'
import { Box } from 'rebass'
import Search from './components/search'
import Items from './components/items'
import Inclusions, { inclusionsMap, ItemInclusion } from './components/inclusions'
import queryString from 'query-string'
import { Subject, timer } from 'rxjs'
import { debounce } from 'rxjs/operators'
import DappNav from '../../components/dappNav'

type MatchParams = {
  address?: string
}

type UrlParams = {
  search?: string
  includes?: string
}

const searchParam$ = new Subject<string>()

export const BrowseView = () => {
  let defaultSearchString = ''
  let defaultInclusions: ItemInclusion[] = ['sale']

  const location = useLocation()
  const history = useHistory()

  // Set default search & includes from url
  if (location.search) {
    const { search, includes }: UrlParams = queryString.parse(location.search)
    if (search) {
      defaultSearchString = search
      defaultInclusions = []
    }
    if (includes !== undefined) {
      defaultInclusions = getValidInclusions(includes)
    }
  }

  const [searchString, setSearchString] = useState(defaultSearchString)
  const [inclusions, setInclusions] = useState<ItemInclusion[]>(defaultInclusions)

  const setUrlParams = useCallback((params: UrlParams) => {
    const queryParams: UrlParams = queryString.parse(location.search)
    history.replace({ search: queryString.stringify({ ...queryParams, ...params }) })
  }, [location, history])

  useEffect(() => {
    // Update if at least 400ms have passed
    const searchParamSub = searchParam$
      .pipe(
        debounce(() => timer(400)),
      )
      .subscribe(search => {
        // Update state & url
        setSearchString(search)
        setUrlParams({ search })
      })

    return () => {
      if (searchParamSub) {
        searchParamSub.unsubscribe()
      }
    }
  })

  const match = useRouteMatch<MatchParams>()
  const { address } = (match && match.params) || {}

  return (
    <ViewWrapper py={0}>
      <ViewGrid>
        <ViewSide>
          <DappNav/>
        </ViewSide>
        <ViewContent>
          <Box mb={'lg'}>
            <Search defaultValue={searchString} onSearch={newSearchString => searchParam$.next(newSearchString)}/>
          </Box>
          <Box mb={'lg'}>
            <Inclusions inclusions={inclusions} onChange={(inclusions: ItemInclusion[]) => {
              setInclusions(inclusions)
              setUrlParams({ includes: inclusions ? inclusions.join(',') : undefined })
            }}/>
          </Box>
          <Box mb={'lg'}>
            <Items
              address={address}
              searchString={searchString}
              inclusions={inclusions}
            />
          </Box>
        </ViewContent>
      </ViewGrid>
    </ViewWrapper>
  )
}

const getValidInclusions = (includesStr: string): ItemInclusion[] => {
  const includes = includesStr && includesStr.split(',')

  // Filter incorrect inclusions
  return includes
    ? includes.filter(v => Object.keys(inclusionsMap).includes(v)) as ItemInclusion[]
    : []
}

export default BrowseView
