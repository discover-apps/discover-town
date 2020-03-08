// The object type interface
export interface User {
    _id: String,
    email: String,
    password: String
}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    confirm: string;
}