import { ApolloServer } from 'apollo-server-express'
import { Request, Response } from 'express'
import costAnalysis from 'graphql-cost-analysis'

class ProtectedApolloServer extends ApolloServer {
  async createGraphQLServerOptions(req: Request, res: Response): Promise<any> {
    const options = await super.createGraphQLServerOptions(req, res)

    return {
      ...options,
      validationRules: [
        ...options.validationRules,
        costAnalysis({
          maximumCost: 750,
          defaultCost: 1,
          variables: req.body.variables,
          createError: (max, actual) => {
            return new Error(
              `GraphQL query exceeds maximum complexity, please remove some nesting or fields and try again. (max: ${max}, actual: ${actual})`
            )
          },
        }),
      ],
    }
  }
}

export default ProtectedApolloServer