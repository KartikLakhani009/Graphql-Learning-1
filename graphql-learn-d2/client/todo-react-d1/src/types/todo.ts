export type Todo = {
    id: string;
    title: string;
    completed: boolean;
    user: User;
}

export type User = {
    id: string;
    name: string;
    phone: string;
    website: string;
    company: Company;
}

export type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
}