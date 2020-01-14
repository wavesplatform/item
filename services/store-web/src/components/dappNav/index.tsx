import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useLocation } from 'react-router'
import { DappHeading, List, ListItem, Loading } from '@item-protocol/ui'
import { IDapp } from '@item-protocol/types'
import { BoxProps, Flex } from 'rebass'
import { DappsQuery } from '../../graphql/queries/__generated__/DappsQuery'
import { useQuery } from '@apollo/react-hooks'
import { getDappsQuery } from '../../graphql/queries/getDapps'

interface DappNavProps extends BoxProps {}

type TData = DappsQuery
type TVariables = {
  offset: number
  limit: number
}

export const DappNav = (props: DappNavProps) => {
  const { data, loading } = useQuery<TData, TVariables>(getDappsQuery, {
    fetchPolicy: 'cache-and-network',
  })
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (loading) {
    return <Loading />
  }

  const dapps = (data && data.dapps) || []

  return (
    <Flex height='100%' flexDirection='column'>
      <List
        flex={1}
        justifyContent='flex-start'
        sx={{
          flexDirection: 'column',
          borderWidth: 0,
        }}>
        {dapps.map(dapp => (
          <ListItem sx={{ p: 0, maxWidth: '16rem' }} key={dapp.id}>
            <RouterLink
              to={{
                pathname: `/items/${dapp.address}`,
                search: location.search,
              }}>
              <DappHeading avatarOnly={isCollapsed} dapp={dapp as IDapp} size={'md'} sx={{ px: 'lg', py: 'md' }} />
            </RouterLink>
          </ListItem>
        ))}
      </List>

      <Flex
        alignItems='center'
        onClick={() => setIsCollapsed(!isCollapsed)}
        py='lg'
        justifyContent='center'
        sx={{ cursor: 'pointer', borderTop: theme => `1px solid ${theme.colors.secondary}` }}>
        {isCollapsed ? '>' : '<'}
      </Flex>
    </Flex>
  )
}

export default DappNav
