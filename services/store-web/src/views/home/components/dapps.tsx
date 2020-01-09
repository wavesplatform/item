import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { DappCard, Loading, NullState } from '@item-protocol/ui'
import { Grid } from '../../../components/layout'
import { Link as RouterLink } from 'react-router-dom'
import { IDapp } from '@item-protocol/types'
import { DappsQuery } from '../../../graphql/queries/__generated__/DappsQuery'
import { getDappsQuery } from '../../../graphql/queries/getDapps'

type TData = DappsQuery

export const Dapps = () => {
  const { data, loading } = useQuery<TData>(getDappsQuery, {
    fetchPolicy: 'cache-and-network',
  })

  const dapps = data && data.dapps
  if (!dapps && loading) {
    return <Loading>Loading dapps...</Loading>
  }

  if (!dapps || !dapps.length) {
    return (
      <NullState heading={'Not dapps here...'} message={"Maybe it hasn't been added yet or something's broken ;("} />
    )
  }

  return (
    <Grid
      sx={{
        gridGap: 'lg',
        gridTemplateColumns: ['repeat(2, 1fr)', '.24fr .19fr .19fr .19fr .19fr'],
      }}>
      {dapps.map(dapp => (
        <RouterLink to={`/items/${dapp.address}`} key={dapp.id}>
          <DappCard dapp={dapp as IDapp} />
        </RouterLink>
      ))}
    </Grid>
  )
}

export default Dapps
