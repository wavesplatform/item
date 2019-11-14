import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flex } from 'rebass'
import { Modal } from '../index'

storiesOf('Modal', module)
  .addDecorator(story => (<div id='root'>{story()}</div>))
  .add('Default', () => (
    <Flex>
      <Modal isOpen={true} container={document.getElementById('root')!}>
        Modal content
      </Modal>
    </Flex>
  ))