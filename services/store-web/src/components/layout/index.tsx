import React from 'react'
import { Box, BoxProps } from 'rebass'
import styled from '@emotion/styled'

export const Grid = styled(Box)`
  display: grid;
`

export const Container = (props: BoxProps) => <Box width={1} mx={'auto'} px={'lg'} {...props} />

export const Section = (props: BoxProps) => <Box py={6} {...props} />

export const ViewWrapper = Section

export const ViewGrid = (props: BoxProps) => (
  <Grid
    sx={{
      gridTemplateColumns: 'auto 1fr',
      gridGap: 0,
    }}
    {...props}
  />
)

export const ViewSide = (props: BoxProps) => (
  <Box
    overflow={'hidden'}
    sx={{
      borderRightStyle: 'solid',
      borderRightColor: 'grays.7',
      borderRightWidth: '1px',
    }}
    {...props}
  />
)

export const ViewContainer = (props: BoxProps) => <Container maxWidth={'1280px'} {...props} />

export const ViewContent = (props: BoxProps) => <Box p={'lg'} {...props} />
