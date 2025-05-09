import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String!
    website: String!
    company: Company!
  }

  type Company {
    name: String!
    catchPhrase: String!
    bs: String!
  }

  input CompanyInput {
    name: String!
    catchPhrase: String!
    bs: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    phone: String!
    website: String!
    company: CompanyInput!
  }

  input UpdateUserInput {
    id: ID!
    name: String
    email: String
    phone: String
    website: String
    company: CompanyInput
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`; 