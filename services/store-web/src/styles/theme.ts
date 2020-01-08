import { baseTheme } from '@item-protocol/ui'
import { transparentize } from 'polished'

const header = {
  width: '100%',
  height: 52,

  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',

  position: 'fixed',
  top: 0,
  zIndex: 3,

  bg: 'background',
  borderBottom: ({ colors }: any) => `1px solid ${colors.secondary}`,
}

const footer = {
  borderTop: '1px solid',
  borderColor: 'grays.7',
}

const navs = {
  item: {
    color: 'text',

    '&:hover, &:focus': {
      bg: 'grays.8',
    },
  },
  itemActive: {
    variant: 'navs.item',
    bg: 'grays.8',
  },
}

const modal = {
  backdrop: {
    bg: transparentize(0.5, '#03060f'),
    p: 'lg',
  },
  content: {
    bg: 'grays.8',
    borderRadius: 'lg',
    p: 'xl',
  },
  itemContent: {
    bg: 'grays.8',
    borderRadius: 'lg',
    p: 'xl',
  },
}

export const theme = {
  ...baseTheme,
  header,
  footer,
  navs,
  modal,
}
