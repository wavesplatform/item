import express from 'express'
import { gql, makeExecutableSchema } from 'apollo-server-express'
import { prisma } from './__generated__/prisma-client'
import { resolvers } from './resolvers'
import { importSchema } from 'graphql-import'
import { resolve } from 'path'
import { AuthDirective, InternalDirective } from './schemaDirectives'
import { decodeToken, TokenPayload } from './helpers/auth'
import ProtectedApolloServer from './protected-server'
import depthLimit from 'graphql-depth-limit'
import Debug from 'debug'
import { config } from './config'

const debug = Debug('api')

debug('🎹 API is starting...')

const typeDefs = gql`
  ${importSchema(resolve(__dirname, '../schema.graphql'))}
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as any,
  schemaDirectives: {
    auth: AuthDirective,
    internal: InternalDirective,
  },
})

const server = new ProtectedApolloServer({
  schema,
  uploads: {
    maxFileSize: 25 * 1024 * 1024,
  },
  context: async ({ req }) => {
    const token = req.headers.authorization

    let me: TokenPayload
    if (token) {
      try {
        me = await decodeToken(token.replace('Bearer ', ''))
      } catch (err) {
        // Ignore incorrect token
      }
    }

    return {
      prisma,
      token,
      me,
    }
  },
  validationRules: [depthLimit(5)],
})

const app = express()
server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.send({ status: 'UP' })
})

const port = config.port

app.listen({ port }, () => {
  debug(`💉 Healthcheck running at ${port} port`)
  debug(`✅ API started! Port: ${port}, graphqlPath: ${server.graphqlPath}`)
})
