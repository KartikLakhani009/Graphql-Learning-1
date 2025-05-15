import prisma from "../lib/db";
import { createTokenInput, createUserInput, getUserTokenInput, updateUserInput } from "../types/user";
import { createHmac, randomBytes } from 'node:crypto';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process?.env?.JWT_SECRET || 'secret';

export async function getJwtSecret(token:string){
    if(!token) throw new Error('token is empty');
    return jwt.verify(token, JWT_SECRET);
}

async function createToken(payload:createTokenInput){
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '1d'});
}

class UserService {

    private static generatePasswordHash(salt:string, password:string):string{
        const hash = createHmac('sha256', salt).update(password).digest('hex');
        return hash;
    }

    public static async createUser(payload :createUserInput){

        const {email, password, firstName, lastName} = payload;

        const salt = randomBytes(32).toString('hex');

        const hash =  this.generatePasswordHash(salt,password );

        const user = await prisma.user.create({
            data: {email, password:hash, firstName, lastName, salt: salt}
        })
        return user;
    }

    private static async getUserEmail(email:string){
        return prisma.user.findUnique({
            where: {email}
        })
    }

    public static async getUserToken(payload:getUserTokenInput){
        const {email, password} = payload;

        const user = await this.getUserEmail(email);

        if(!user) throw new Error('User not found');

        const salt = user.salt;
        const hash = this.generatePasswordHash(salt, password);

        if(user.password !== hash) throw new Error('Invalid password');

        const token = await createToken({id: user.id, email: user.email, firstName: user.firstName});

        return token;
    }

    private static async getUsers(){
        const users = await prisma.user.findMany();
        return users;
    }

    public static async updateUser(payload:updateUserInput){
        const {id, email, firstName, lastName} = payload;

        const user = await prisma.user.update({
            where: {id},
            data: {email, firstName, lastName}
        })

        if(!user) throw new Error('User not found');

        return user;
    }

    public static async getProfile(payload:{id:string}){
        const {id} = payload;

        const user = await prisma.user.findUnique({
            where: {id}
        })
        
        if(!user) throw new Error('User not found');
        
        return user;
    }
}

export default UserService;