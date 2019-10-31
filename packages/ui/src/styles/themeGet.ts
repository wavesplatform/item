import { get } from 'styled-system'

export const themeGet = (path: string | number, fallback?: string | number) => (props: any) =>
  fallback
    ? get(props.theme, path, fallback)
    : get(props.theme, path)
