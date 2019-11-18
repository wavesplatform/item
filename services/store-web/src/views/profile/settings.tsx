import React from 'react'
import { Box, Heading } from 'rebass'
import SettingsForm from './components/settingsForm'

export const SettingsView = () => {
  return (
    <Box mb={'lg'}>
      <Heading as={'h2'} sx={{ fontSize: 'h2', mb: 'md' }}>User Info</Heading>
      <Box maxWidth={'420px'}>
        <SettingsForm/>
      </Box>
    </Box>
  )
}

export default SettingsView