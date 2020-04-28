import {readUserById} from "../user/user.database";
import User from "../../models/user.model";

export const authenticateAdmin = (userId: number): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        readUserById(userId).then((user: User) => {
            if (user.admin) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch((error) => {
            reject(error);
        })
    });
};