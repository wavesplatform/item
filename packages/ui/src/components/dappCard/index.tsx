import React from 'react'
import { StyledDappCard, Inner, Overview, Image, Title } from './style'
import { Flex, Text } from 'rebass'
import { UserAvatar } from '../image'
import { IDapp } from '@item/types'
import emptyImage from '../image/empty.svg'

export type DappCardStyle = 'base' | 'short'

interface IProps {
  dapp: IDapp
  style?: DappCardStyle
}

export const DappCard = (props: IProps) => {
  const { dapp } = props
  const image = (dapp.image && dapp.image.page) || emptyImage

  return (
    <StyledDappCard>
      <Overview borderRadius={'lg'}>
        <Image style={{ backgroundImage: `url(${image})` }}/>
      </Overview>
      <Inner p={'lg'} flexDirection={'column'} justifyContent={'space-between'}>
        <Flex>
          <UserAvatar
            icon={dapp.image && dapp.image.icon}
            address={dapp.address}
            size={'xl'}
          />
        </Flex>
        <Flex flexDirection={'column'}>
          <Title
            fontSize={'lg'}
            m={0}
          >
            {dapp.name}
          </Title>
          <Text color={'grays.4'}>{dapp.totalItems} items</Text>
        </Flex>
      </Inner>
    </StyledDappCard>
  )
}
