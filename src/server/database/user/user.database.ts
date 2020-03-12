import {database} from '../_database';
import User from "../../models/user.model";

export const createUser = async (user: User): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        database<User>('Users')
            .insert(user)
            .then((results: any) => {
                resolve(results[0]);
            })
            .catch((error: any) => {
                // handle duplicate error
                if (error && error.errno == 1062) {
                    if (error.sqlMessage.includes('username_UNIQUE')) {
                        reject('A user with that username already exists.');
                    } else if (error.sqlMessage.includes('email_UNIQUE')) {
                        reject('A user with that email address already exists.');
                    }
                }
                reject(error);
            });
    });
};

export const readUserById = (userId: number): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        database<User>('Users')
            .select("*")
            .where({id: userId})
            .first()
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const readUserByUsername = (username: string): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        database<User>('Users')
            .select("*")
            .where({username: username})
            .first()
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const readUserByEmail = (email: string): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        database<User>('Users')
            .select("*")
            .where({email: email})
            .first()
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const updateUser = async (userId: number, user: User): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        database<User>('Users')
            .update(user)
            .where({id: userId})
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                // handle duplicate error
                if (error && error.errno == 1062) {
                    if (error.sqlMessage.includes('username_UNIQUE')) {
                        reject('A user with that username already exists.');
                    } else if (error.sqlMessage.includes('email_UNIQUE')) {
                        reject('A user with that email address already exists.');
                    }
                }
                reject(error);
            });
    });
};

export const deleteUser = async (userId: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        database<User>('Users')
            .delete()
            .where({id: userId})
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};