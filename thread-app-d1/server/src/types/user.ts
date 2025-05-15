export type createUserInput = {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
};

export type updateUserInput = {
    id: string;
    email: string;
    firstName: string;
    lastName?: string;
};

export type getUserTokenInput = {
    email: string;
    password: string;
}

export type createTokenInput = {
    id: string;
    email: string;
    firstName: string;
}