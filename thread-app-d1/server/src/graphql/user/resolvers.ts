import prisma from "../../lib/db"
import { createUserInput, getUserTokenInput } from "../../types/user"

import UserService from "../../services/user";

const Query = {
    getUserToken: async (_ :any, {email, password}:getUserTokenInput) => {
        const token = await UserService.getUserToken({email, password});
        return token;
    },
    getProfile: async (_ :any,params:any,context:any) => {
        if(context && context.user && context.user.id){
            const user = await UserService.getProfile({id:context.user.id});
            return user;
        }

        return new Error('token is required');
    }
}


const Mutation = {
    createUser: async (_ :any, {email, password, firstName, lastName}:createUserInput) => {
        const user = await UserService.createUser({email, password, firstName, lastName});
        return user.id;
    }
}


export const resolvers = {
    Query : Query,
    Mutation : Mutation
}