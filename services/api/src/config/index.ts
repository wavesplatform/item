export const config = {
  port: process.env.PORT || 4000,
  production: process.env.NODE_ENV === 'production',
  jwtSecret: process.env.JWT_SECRET || 'jwtsecret',
  network: process.env.NETWORK || 'testnet',
  authData: process.env.AUTH_DATA || 'item',
  s3: {
    token: process.env.S3_TOKEN || 's3token',
    secret: process.env.S3_SECRET || 's3secret',
  },
  algolia: {
    appId: process.env.ALGOLIA_APP_ID,
    apiSecret: process.env.ALGOLIA_API_SECRET,
  },
  maxFirstPerRequest: 20,
}

export default config
