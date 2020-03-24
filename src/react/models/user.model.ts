// The object type interface
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    city: string;
    state: string;
    country: string;
    joined: Date;
}

export interface RegisterUser {
    email: string;
    username: string;
    password: string;
    confirm: string;
}