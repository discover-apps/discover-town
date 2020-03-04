import {Request, Response} from 'express';
import {getProfileByEmail} from "../database/users.database";
import {User} from "../models/user.model";

export const secretMessage = (req: Request, res: Response) => {
    res.json({message: "Hello World!"});
};

export const getProfile = (req: Request, res: Response) => {
    const email = "test";
    if (!email) {
        res.sendStatus(401);
    }
    getProfileByEmail(email).then((user: User) => {
        if (user) {
            res.json(user);
        }
    }).catch((error: any) => {
        res.status(403).json(error);
    });
};