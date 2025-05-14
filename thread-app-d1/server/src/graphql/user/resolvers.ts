import prisma from "../../lib/db"
import { createUserInput } from "../../types/user"

const Query = {
    users: async () => {
        const users = await prisma.user.findMany();
        return users;
    }
}


const Mutation = {
    createUser: async (_ :any, {email, password, firstName, lastName}:createUserInput) => {
        const user = await prisma.user.create({
            data: {email, password, firstName, lastName, salt: '1234567890'}
        })
        return true;
    }
}


export const resolvers = {
    Query : Query,
    Mutation : Mutation
}