import { baseTheme } from '@item-protocol/ui'
import { transparentize } from 'polished'

const header = {
  height: 52,

  position: 'fixed',
  top: 0,
  zIndex: 3,

  bg: 'background',
  borderBottom: ({ colors }: any) => `1px solid ${colors.secondary}`,
}

const footer = {
  borderTop: ({ colors }: any) => `1px solid ${colors.secondary}`,
  height: '6em',

  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,

  justifyContent: 'flex-end',
  p: 'lg',
}

const body = {
  position: 'relative',
  overflowX: 'hidden',
  minHeight: '100%',

  pb: footer.height,
  pt: header.height,
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
  body,
  footer,
  navs,
  modal,
}
