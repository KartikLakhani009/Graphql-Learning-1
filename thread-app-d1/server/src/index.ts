import express from 'express';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import bodyParser from 'body-parser';
import cors from 'cors';

import prisma from './lib/db';
import { createUserInput } from './types/user';

const app = express();

const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(bodyParser.json());

const gqlServer = new ApolloServer({
    typeDefs:'type Query{hello:String} type Mutation{createUser(email:String!, password:String!, firstName:String!, lastName:String!):Boolean}',
    resolvers:{
        Query:{
            hello: () => 'Hello World'
        },
        Mutation:{
            createUser: async (_, {email, password, firstName, lastName}:createUserInput) => {
                const user = await prisma.user.create({
                    data: {
                        email,
                        password,
                        firstName,
                        lastName,
                        salt: '1234567890'
                    }
                })

                console.log(user);

                return true;
            }
        }
    }
});

gqlServer.start().then(() => {
    app.use('/graphql', expressMiddleware(gqlServer));

    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    
    app.listen(PORT, () => {
        console.log('Server is running on port ', PORT);
    });
});




