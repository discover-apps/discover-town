import {readUserById} from "../user/user.database";
import User from "../../models/user.model";

export const authenticateAdmin = (userId: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        readUserById(userId).then((user: User) => {
            if (user.admin) {
                resolve();
            } else {
                reject("User is not an administrator.");
            }
        }).catch((error) => {
            reject(error);
        })
    });
};