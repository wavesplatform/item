export const config = {
  port: process.env.PORT || 3004,
  production: process.env.NODE_ENV === 'production',
  s3: {
    token: process.env.S3_TOKEN || 's3token',
    secret: process.env.S3_SECRET || 's3secret',
  },
  itemMaxImageSizeByte: 5000000,
  bucketName: process.env.BUCKET_NAME || 'bucket',
}

export default config
