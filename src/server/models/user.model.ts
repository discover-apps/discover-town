interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    city: string;
    state: string;
    country: string;
    joined: Date;
    admin: boolean;
    banned: boolean;
}

export default class User implements IUser {
    public id: number;
    public username: string;
    public email: string;
    public password: string;
    public city: string;
    public state: string;
    public country: string;
    public joined: Date;
    public admin: boolean;
    public banned: boolean;

    constructor(data?: any) {
        const defaults: IUser = {
            ...data
        };

        this.id = defaults.id;
        this.email = defaults.email;
        this.username = defaults.username;
        this.password = defaults.password;
        this.city = defaults.city;
        this.state = defaults.state;
        this.country = defaults.country;
        this.joined = defaults.joined;
        this.admin = defaults.admin;
        this.banned = defaults.banned;
    }
}