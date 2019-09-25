import typescript from 'rollup-plugin-typescript2'
import external from 'rollup-plugin-peer-deps-external'
import url from 'rollup-plugin-url'
import pkg from './package.json'
import commonjs from 'rollup-plugin-commonjs'

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
    }
  ],
  external: [
    'react',
    'react-dom',
    '@emotion/core',
    'polished',
    '@waves/bignumber',
    '@emotion/styled',
    'rebass',
    'styled-system',
  ],
  plugins: [
    external(),
    url(),
    typescript({
      tsconfig: 'tsconfig.build.json',
      clean: true,
    }),
    commonjs({
      namedExports: { '@waves/bignumber': ['BigNumber'] }
    }),
  ],
}