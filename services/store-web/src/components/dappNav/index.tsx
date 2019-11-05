import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useLocation } from 'react-router'
import { DappHeading, Loading } from '@item/ui'
import { IDapp } from '@item/types'
import { Box, BoxProps, Flex } from 'rebass'
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
  const dappsList = (<Flex sx={{
      flexDirection: 'column',
    }}>
      {dapps.map(dapp => (<RouterLink
        to={{
          pathname: `/items/${dapp.address}`,
          search: location.search,
        }}
        key={dapp.id}
      >
        <DappHeading dapp={dapp as IDapp} size={'sm'}/>
      </RouterLink>))}
    </Flex>
  )

  return <Box>{dappsList}</Box>
}

export default DappNav
