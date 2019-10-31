import React from 'react'
import { Icon, Loading } from '@item/ui'
import { PlatformStatsQuery } from '../../../../graphql/queries/__generated__/PlatformStatsQuery'
import { getPlatformStatsQuery } from '../../../../graphql/queries/getPlatformStats'
import { Flex, FlexProps, Text } from 'rebass'
import { useQuery } from '@apollo/react-hooks'
import styled from '@emotion/styled'

type TProps = {}
type TData = PlatformStatsQuery

export const Stats = (props: TProps) => {
  const { data, loading } = useQuery<TData>(getPlatformStatsQuery, {
    fetchPolicy: 'cache-first',
  })

  if (loading) {
    return <Loading/>
  }

  const platformStats = data && data.platformStats
  const { dapps, items } = platformStats || { dapps: 0, items: 0, transactions: 0 }

  return (
    <Flex
      mx={'auto'}
      justifyContent={'center'}
    >
      <Column>
        <IconWrapper color={'red'}>
          <Icon glyph={'games'}/>
        </IconWrapper>
        <Title as={'h3'}><b>{dapps}</b> Dapps</Title>
      </Column>
      <Column>
        <IconWrapper color={'blue'}>
          <Icon glyph={'filter'}/>
        </IconWrapper>
        <Title as={'h3'}><b>{items}</b> Items</Title>
      </Column>
    </Flex>
  )
}

export default Stats

const Title = styled(Text)`
  font-size: 1rem;
  font-weight: normal;
`

const Column = (props: FlexProps) =>
  <Flex
    alignItems={'center'}
    px={'lg'}
    sx={{
      '&:last-child': {
        borderRight: 0,
      },
    }}
    {...props}
  />

const IconWrapper = (props: FlexProps) =>
  <Flex
    mr={'lg'}
    fontSize={'lg'}
    bg={'grays.8'}
    sx={{
      lineHeight: 1,
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: .8,
    }}
    {...props}
  />