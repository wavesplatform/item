import typescript from 'rollup-plugin-typescript2'
import external from 'rollup-plugin-peer-deps-external'
import url from 'rollup-plugin-url'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import commonjs from 'rollup-plugin-commonjs'

const extensions = [...DEFAULT_EXTENSIONS, 'ts', 'tsx']

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'react-dom',
    '@emotion/core',
    '@emotion/styled',
    '@emotion/styled-base',
    '@emotion/memoize',
    '@emotion/is-prop-valid',
    'rebass',
    '@rebass/forms',
    'styled-system',
    '@styled-system/css',
    '@styled-system/should-forward-prop',
    'polished',
    'identity-img',
    '@waves/bignumber',
    'rxjs',
    'rxjs/operators',
  ],
  plugins: [
    external(),
    url(),
    typescript({
      tsconfig: 'tsconfig.build.json',
      tsconfigOverride: { compilerOptions: { target: 'esnext', jsx: 'preserve' } },
      clean: true,
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-typescript',
        '@babel/preset-react',
        '@emotion/babel-preset-css-prop',
      ],
    }),
    commonjs(),
  ],
}
