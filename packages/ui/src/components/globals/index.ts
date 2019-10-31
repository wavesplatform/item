import { css } from '@emotion/core'

export const truncate = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`

export * from './badge'
export * from './price'
export * from './quantity'

