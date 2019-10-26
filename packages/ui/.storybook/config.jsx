import React from 'react'
import { addDecorator, configure } from '@storybook/react'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import { baseTheme } from '../src/styles/theme'
import { globalStyle } from '../src/styles/global'
import { Box } from 'rebass'

addDecorator(story => (
  <ThemeProvider theme={baseTheme}>
    <Global styles={globalStyle}/>
    <Box p={'lg'}>{story()}</Box>
  </ThemeProvider>
))

const req = require.context('../src', true, /\.stories\.tsx$|\/__stories__\/.*\.tsx$/)
const loadStories = () => {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
