import { baseTheme } from '@item-protocol/ui'
import { transparentize } from 'polished'

const header = {
  bg: 'background',
  borderBottom: '1px solid',
  borderColor: 'grays.7',
  position: 'fixed',
  zIndex: 3,
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
    bg: transparentize(.5, '#03060f'),
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