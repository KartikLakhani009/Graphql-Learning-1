import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@apollo/server/express4';

import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import axios from 'axios';


const API_URL = 'https://jsonplaceholder.typicode.com';

const app = express();

app.use(cors());
app.use(json());

const server = new ApolloServer({
    typeDefs:`
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

    type Todo {
        id: ID!
        title: String!
        completed: Boolean!
        user: User!
    }

    type Query{
        todos: [Todo!]!
        users: [User!]!
        user(id: ID!): User!
        todo(id: ID!): Todo!
    }`,
    resolvers:{
        Todo:{
            user: async (parent) => {
                const response = await axios.get(`${API_URL}/users/${parent.userId}`);
                return response.data;
            }
        },
        Query:{
            todos: async () => {
                const response = await axios.get(`${API_URL}/todos`);
                return response.data;
            },
            users: async () => {
                const response = await axios.get(`${API_URL}/users`);
                return response.data;
            },
            user: async (_, { id }) => {
                console.log("user-> id " ,_);
                const response = await axios.get(`${API_URL}/users/${id}`);
                return response.data;
            },
            todo: async (_, { id }) => {
                const response = await axios.get(`${API_URL}/todos/${id}`);
                return response.data;
            }
        },
    },
});

server.start().then(() => {
    app.use('/graphql', expressMiddleware(server));
    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    
    app.listen(4000, () => {
        console.log('Server is running on port 4000');
    });
        
});

