import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flex } from 'rebass'
import { UserHeading } from '../userHeading'
import { IDapp, IUser } from '@item/types'
import { DappHeading } from '../dappHeading'

const user: IUser = {
  address: '3N341VEEExcAt9FtSJ7taaUTCgGQpVbGS1Y',
}

const dapp: IDapp = {
  address: '3N341VEEExcAt9FtSJ7taaUTCgGQpVbGS1Y',
  meta: {
    description: 'The amazing decentralized application',
  },
}

storiesOf('Heading', module)
  .add('User', () => (
    <Flex alignItems={'flex-start'} flexDirection={'column'}>
      <UserHeading user={user} size={'sm'} mb={'md'}/>
      <UserHeading user={user} mb={'md'}/>
      <UserHeading user={user} size={'lg'}/>
    </Flex>
  ))
  .add('Dapp', () => (
    <Flex alignItems={'flex-start'} flexDirection={'column'}>
      <DappHeading dapp={dapp} size={'sm'} mb={'md'}/>
      <DappHeading dapp={dapp} mb={'md'}/>
      <DappHeading dapp={dapp} size={'lg'}/>
    </Flex>
  ))