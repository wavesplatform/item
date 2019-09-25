import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Flex } from 'rebass'
import { Button, IconButton } from '../index'

storiesOf('Button', module)
  .addDecorator(story => (<Box sx={{ p: 'lg' }}>{story()}</Box>))
  .add('Variants', () => (
    <Box>
      <Button variant={'secondary'} mr={'sm'}>Default</Button>
      <Button variant={'primary'} mr={'sm'}>Primary</Button>
      <Button variant={'success'} mr={'sm'}>Success</Button>
      <Button variant={'danger'} mr={'sm'}>Danger</Button>
      <Button variant={'warn'} mr={'sm'}>Warning</Button>
      <Button variant={'info'} mr={'sm'}>Info</Button>
      <Button variant={'light'} mr={'sm'}>Light</Button>
      <Button variant={'dark'}>Dark</Button>
    </Box>
  ))
  .add('Sizes', () => (
    <Flex alignItems={'flex-start'}>
      <Button variant={'secondary'} size={'sm'} mr={'sm'}>Small button</Button>
      <Button variant={'secondary'} size={'md'} mr={'sm'}>Default button</Button>
      <Button variant={'secondary'} size={'lg'}>Large button</Button>
    </Flex>
  ))
  .add('Icon', () => (
    <Box>
      <IconButton glyph={'search'} mr={'sm'}/>
      <IconButton glyph={'filter'}/>
    </Box>
  ))