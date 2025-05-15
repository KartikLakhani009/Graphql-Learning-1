import express from 'express';

import { expressMiddleware } from '@apollo/server/express4';

import bodyParser from 'body-parser';
import cors from 'cors';
import { initGraphqlServer } from './graphql';
import { getJwtSecret } from './services/user';


const app = express();

const PORT = Number(process.env.PORT) || 4000;
const isDevelopment = process.env.NODE_ENV !== 'production';

// Add request logging middleware
app.use((req, res, next) => {
    if(isDevelopment) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        console.log('Headers:', req.headers);
    }
    next();
});

app.use(cors());
app.use(bodyParser.json());

initGraphqlServer().then((gqlServer) => {
    app.use('/graphql', expressMiddleware(gqlServer,{context:async ({req}) =>{
        try {
            const token = req.headers.authorization;
            if(isDevelopment) {
                console.log('token',token);
            }
            if(!token) return {};

            const user = await getJwtSecret(token);
            if(isDevelopment) {
                console.log('user',user);
            }
            return {user};    
        } catch (error) {
            return {};
        }
    }}));


    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.listen(PORT, () => {
        console.log('Server is running on port ', PORT);
    });

});




