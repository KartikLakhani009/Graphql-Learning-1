import { ApolloServer } from "@apollo/server";

import { userSchema } from "./user";

export async function initGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs:`
                ${userSchema.typeDefs}

                
                type Query{
                    hello:String,
                    ${userSchema.queries}
                }
                
                type Mutation{
                    ${userSchema.mutations}
                }
                
                `,
        resolvers:{
            Query:{
                ...userSchema.resolvers.Query,
                hello: () => 'Hello World',
                
            },
            Mutation:{
                ...userSchema.resolvers.Mutation
            }
        }
    });

    await gqlServer.start();

    return gqlServer
    
}

