import { gql } from "graphql-tag";

export const todoTypeDefs = gql`
  type Todo {
    id: ID!
    userId: Int!
    title: String!
    completed: Boolean!
  }

  input CreateTodoInput {
    title: String!
    userId: Int!
    completed: Boolean
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    userId: Int
    completed: Boolean
  }

  extend type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
    todosByUser(userId: Int!): [Todo!]!
  }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;
