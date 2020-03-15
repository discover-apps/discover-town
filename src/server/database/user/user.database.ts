import {database} from '../_database';
import User from "../../models/user.model";
import Follower from "../../models/follower.model";

export const createUser = async (user: User): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        // validate username
        const usernameError = validateUsername(user.username);
        if (usernameError) {
            reject(usernameError);
        }
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
        // validate username
        const usernameError = validateUsername(user.username);
        if (usernameError) {
            reject(usernameError);
        }
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

const validateUsername = (username: string): string => {
    if (/[^a-zA-Z0-9_]/.test(username)) {
        return 'Username should not contain any special characters.';
    }

    if (username.length < 4 || username.length > 16) {
        return 'Username should be between 4 and 16 characters.';
    }

    return undefined;
};

export const addUserFollower = async (username1: string, username2: string): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const user1: User = await readUserByUsername(username1);
            const user2: User = await readUserByUsername(username2);
            database<Follower>('UserFollowsUser')
                .insert({userId: user2.id, targetId: user1.id})
                .then((results: any) => {
                    return resolve('Successfully followed user.');
                })
                .catch((error: any) => {
                    if (error && error.errno && error.errno == 1062) {
                        return reject('User already follows that user.');
                    } else {
                        return reject(error);
                    }
                });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 *
 * @param username1
 * @param username2
 */
export const removeUserFollower = async (username1: string, username2: string) => {
    return new Promise<string>(async (resolve, reject) => {
        const user1: User = await readUserByUsername(username1);
        const user2: User = await readUserByUsername(username2);
        database<Follower>('UserFollowsUser')
            .delete()
            .where({userId: user2.id, targetId: user1.id})
            .then((results: any) => {
                return resolve('Successfully un-followed user.');
            })
            .catch((error: any) => {
                return reject(error);
            });
    });
};

export const getUserFollowers = async (username: string): Promise<User[]> => {
    return new Promise<User[]>(async (resolve, reject) => {
        const user = await readUserByUsername(username);
        if (!user) {
            return reject('Failed to get followers for a user that does not exist.');
        }
        database<Follower>('UserFollowsUser')
            .where({targetId: user.id})
            .then(async (results: Array<any>) => {
                const users: User[] = [];
                for (let i = 0; i < results.length; i++) {
                    const user: User = await readUserById(results[i].userId);
                    users.push(user);
                }
                return resolve(users);
            })
            .catch((error) => {
                return reject(error);
            });
    });
};

export const userFollowsUser = async (username1: string, username2: string): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        const user1 = await readUserByUsername(username1);
        const user2 = await readUserByUsername(username2);
        if (!user1 || !user2) {
            return reject('Failed to get followers for a user that does not exist.');
        }
        database<Follower>('UserFollowsUser')
            .where({userId: user1.id, targetId: user2.id})
            .then(async (results: Array<any>) => {
                return resolve(results.length > 0);
            })
            .catch((error) => {
                return reject(error);
            });
    });
};