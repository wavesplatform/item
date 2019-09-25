module.exports = ({ config }) => {
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        },
      ],
    },
  ]

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}