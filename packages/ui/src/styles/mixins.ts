import { transparentize } from 'polished'

export const buttonVariant = (bg: string) => ({
  backgroundColor: bg,
  '&:hover': {
    backgroundColor: transparentize(0.1, bg),
  },
})

export const fades = (color: string) => {
  // 0 ... 8
  return [5, 10, 20, 30, 50, 70, 80, 90, 95].map(value => transparentize(value / 100, color))
}