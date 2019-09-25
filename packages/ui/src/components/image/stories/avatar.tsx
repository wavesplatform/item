import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Flex } from 'rebass'
import { Avatar, UserAvatar } from '../avatar'

const iconSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
const address = '3N341VEEExcAt9FtSJ7taaUTCgGQpVbGS1Y'

storiesOf('Avatar', module)
  .addDecorator(story => (<Box sx={{ p: 'lg' }}>{story()}</Box>))
  .add('Sizes', () => (
    <Flex alignItems={'flex-start'}>
      <Avatar src={iconSrc} mr={'sm'}/>
      <Avatar src={iconSrc} size={'md'} mr={'sm'}/>
      <Avatar src={iconSrc} size={'lg'}/>
    </Flex>
  ))
  .add('User', () => (
    <Flex>
      <UserAvatar address={address} icon={iconSrc} mr={'sm'}/>
      <UserAvatar address={address}/>
    </Flex>
  ))