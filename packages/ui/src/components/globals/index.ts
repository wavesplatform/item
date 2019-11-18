import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Box } from 'rebass'

export const truncate = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`

export const Truncate = styled(Box)`
  ${truncate}
`

export * from './badge'
export * from './price'
export * from './quantity'

