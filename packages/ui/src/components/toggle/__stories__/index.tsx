import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Toggle } from '..'

storiesOf('Toggle', module).add('Default', () => {
  const [checked, setChecked] = useState(false)
  return (
    <Toggle checked={checked} onChange={() => setChecked(currentChecked => !currentChecked)}>
      Unique item (Non-fungible token)
    </Toggle>
  )
})
