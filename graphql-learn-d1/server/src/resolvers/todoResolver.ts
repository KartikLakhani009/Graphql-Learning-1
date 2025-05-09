import { todoService } from '../services/todoService';

export const todoResolvers = {
  Query: {
    todos: async () => {
      return todoService.getAllTodos();
    },
    todo: async (_: any, { id }: { id: number }) => {
      return todoService.getTodoById(id);
    },
    todosByUser: async (_: any, { userId }: { userId: number }) => {
      return todoService.getTodosByUser(userId);
    }
  },
  Mutation: {
    createTodo: async (_: any, { input }: { input: any }) => {
      return todoService.createTodo(input);
    },
    updateTodo: async (_: any, { input }: { input: any }) => {
      return todoService.updateTodo(input);
    },
    deleteTodo: async (_: any, { id }: { id: number }) => {
      return todoService.deleteTodo(id);
    }
  }
}; 