import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver, GraphQLField, GraphQLInterfaceType, GraphQLObjectType } from 'graphql'

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    field: GraphQLField<any, any>,
    details: { objectType: GraphQLObjectType | GraphQLInterfaceType },
  ): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field
    const { requires } = this.args

    field.resolve = async function(...args) {
      const ctx = args[2]
      const { token, me } = ctx
      if (!token) {
        throw new AuthenticationError('No authorization token')
      }

      if (!me) {
        throw new AuthenticationError('You are not authorized')
      }

      if (!requires) {
        return await resolve.apply(this, args)
      }

      if (!me.permissions.includes(requires)) {
        throw new AuthenticationError('Not found permissions')
      }

      return await resolve.apply(this, args)
    }
  }
}

export class InternalDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    field: GraphQLField<any, any>,
    details: { objectType: GraphQLObjectType | GraphQLInterfaceType },
  ): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field

    // TODO: need implementing

    field.resolve = async function(...args) {
      const ctx = args[2]
      const { token, me } = ctx

      return await resolve.apply(this, args)
    }
  }
}
