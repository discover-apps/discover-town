export default interface User {
    id?: number;
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    joined?: Date;
    private?: boolean;
    completed?: boolean;
    city?: string;
    state?: string;
    country?: string;
}