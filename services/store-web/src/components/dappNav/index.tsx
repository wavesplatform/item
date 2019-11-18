import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useLocation } from 'react-router'
import { DappHeading, List, ListItem, Loading } from '@item/ui'
import { IDapp } from '@item/types'
import { Box, BoxProps } from 'rebass'
import { DappsQuery } from '../../graphql/queries/__generated__/DappsQuery'
import { useQuery } from '@apollo/react-hooks'
import { getDappsQuery } from '../../graphql/queries/getDapps'

interface DappNavProps extends BoxProps {
}

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

  if (loading) {
    return <Loading/>
  }

  const dapps = (data && data.dapps) || []
  const dappsList = (<List sx={{
      flexDirection: 'column',
      borderWidth: 0,
    }}>
      {dapps.map(dapp => (
        <ListItem sx={{ p: 0 }} key={dapp.id}>
          <RouterLink
            to={{
              pathname: `/items/${dapp.address}`,
              search: location.search,
            }}
          >
            <DappHeading dapp={dapp as IDapp} size={'md'} sx={{ px: 'lg', py: 'md' }}/>
          </RouterLink>
        </ListItem>
      ))}
    </List>
  )

  return <Box>{dappsList}</Box>
}

export default DappNav
