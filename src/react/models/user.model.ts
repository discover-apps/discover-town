// The object type interface
export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
}

export interface RegisterUser {
    email: string;
    username: string;
    password: string;
    confirm: string;
}