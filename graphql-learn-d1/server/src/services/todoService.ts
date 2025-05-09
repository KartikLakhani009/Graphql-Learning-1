import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface CreateTodoInput {
  title: string;
  userId: number;
  completed?: boolean;
}

export interface UpdateTodoInput {
  id: number;
  title?: string;
  userId?: number;
  completed?: boolean;
}

export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  },

  async getTodoById(id: number): Promise<Todo | null> {
    try {
      const response = await axios.get(`${API_URL}/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo ${id}:`, error);
      return null;
    }
  },

  async getTodosByUser(userId: number): Promise<Todo[]> {
    try {
      const response = await axios.get(`${API_URL}/todos?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todos for user ${userId}:`, error);
      return [];
    }
  },

  async createTodo(input: CreateTodoInput): Promise<Todo> {
    try {
      const response = await axios.post(`${API_URL}/todos`, input);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw new Error('Failed to create todo');
    }
  },

  async updateTodo(input: UpdateTodoInput): Promise<Todo> {
    try {
      const response = await axios.put(`${API_URL}/todos/${input.id}`, input);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo ${input.id}:`, error);
      throw new Error('Failed to update todo');
    }
  },

  async deleteTodo(id: number): Promise<boolean> {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      throw new Error('Failed to delete todo');
    }
  }
};
