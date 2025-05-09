import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface CreateUserInput {
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UpdateUserInput {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const userService = {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      return [];
    }
  },

  async getUserById(id: number): Promise<User | null> {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      return null;
    }
  },

  async createUser(input: CreateUserInput): Promise<User> {
    try {
      const response = await axios.post(`${API_URL}/users`, input);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  },

  async updateUser(input: UpdateUserInput): Promise<User> {
    try {
      const response = await axios.put(`${API_URL}/users/${input.id}`, input);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${input.id}:`, error);
      throw new Error('Failed to update user');
    }
  },

  async deleteUser(id: number): Promise<boolean> {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw new Error('Failed to delete user');
    }
  }
}; 