import { userService } from '../services/userService';

export const userResolvers = {
  Query: {
    users: async () => {
      return userService.getAllUsers();
    },
    user: async (_: any, { id }: { id: number }) => {
      return userService.getUserById(id);
    }
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: any }) => {
      return userService.createUser(input);
    },
    updateUser: async (_: any, { input }: { input: any }) => {
      return userService.updateUser(input);
    },
    deleteUser: async (_: any, { id }: { id: number }) => {
      return userService.deleteUser(id);
    }
  }
}; 