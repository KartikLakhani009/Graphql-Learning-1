import { gql } from "graphql-tag";
import { userTypeDefs } from "./userSchema";
import { todoTypeDefs } from "./todoSchema";

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [baseTypeDefs, userTypeDefs, todoTypeDefs]; 