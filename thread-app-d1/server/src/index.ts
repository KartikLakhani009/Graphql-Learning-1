import express from 'express';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(bodyParser.json());

const gqlServer = new ApolloServer({
    typeDefs:'type Query{hello:String}',
    resolvers:{}
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




