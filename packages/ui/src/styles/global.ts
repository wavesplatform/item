import { css } from '@emotion/core'

// We need interface for our theme
// @ts-ignore
export const globalStyle = theme => css`
  ${reset};
  ${keyframes};

  html {
    line-height: ${theme.lineHeights.body};
  }

  body {
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.body}px;
    font-weight: ${theme.fontWeights.body};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: ${theme.space.md}px;
  }
`

const keyframes = css`
  @keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`

const reset = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  html {
    font-family: sans-serif;
    height: 100%;
  }

  body {
    margin: 0;
    text-align: left;
    line-height: inherit;
    height: 100%;
  }

  #root {
    height: 100%;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }
  a:hover {
    cursor: pointer;
  }

  [tabindex='-1']:focus:not(:focus-visible) {
    outline: 0 !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }

  p {
    margin-top: 0;
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }

  b,
  strong {
  }

  img {
    vertical-align: middle;
    border-style: none;
  }

  svg {
    overflow: hidden;
    vertical-align: middle;
  }

  table {
    border-collapse: collapse;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  textarea {
    resize: none;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  select {
    word-wrap: normal;
  }

  [hidden] {
    display: none !important;
  }
`
