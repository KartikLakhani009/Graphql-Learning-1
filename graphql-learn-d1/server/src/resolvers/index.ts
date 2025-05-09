import { userResolvers } from './userResolver';
import { todoResolvers } from './todoResolver';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...todoResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...todoResolvers.Mutation
  }
}; 