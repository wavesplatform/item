import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from 'rebass'
import { NullState } from '../index'

storiesOf('Null State', module)
  .add('Default', () => (
    <Box>
      <NullState heading={'Item not found...'}
                 message={'Maybe something broken :('}
      />
      <NullState icon={'search'}
                 message={'Item not found...'}
      />
    </Box>
  ))