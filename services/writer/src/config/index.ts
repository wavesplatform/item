export const config = {
  port: process.env.PORT || 4003,
  algolia: {
    appId: process.env.ALGOLIA_APP_ID,
    apiSecret: process.env.ALGOLIA_API_SECRET,
    prefix: process.env.ALGOLIA_PREFIX || 'dev_',
  },
}

export default config
