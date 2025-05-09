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
    completed?: boolean;
}



export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: Company;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}


export interface CreateUserInput {
    name: string;
    email: string;
    phone: string;
    website: string;
    company: Company;
}

export interface UpdateUserInput {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    company?: Company;
}

export interface UserService {
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(input: CreateUserInput): Promise<User>;
    updateUser(input: UpdateUserInput): Promise<User>;
    deleteUser(id: number): Promise<boolean>;
}


export interface TodoService {
    getTodos(): Promise<Todo[]>;
    getTodoById(id: number): Promise<Todo>;
    createTodo(input: CreateTodoInput): Promise<Todo>;
    updateTodo(input: UpdateTodoInput): Promise<Todo>;
    deleteTodo(id: number): Promise<boolean>;

    // User Service
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(input: CreateUserInput): Promise<User>;
    updateUser(input: UpdateUserInput): Promise<User>;
    deleteUser(id: number): Promise<boolean>;
}