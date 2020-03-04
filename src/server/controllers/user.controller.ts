import {Request, Response} from 'express';
import {getProfileByEmail} from "../database/users.database";
import {User} from "../models/user.model";

export const secretMessage = (req: Request, res: Response) => {
    res.json({message: "Hello World!"});
};

export const getProfile = (req: Request, res: Response) => {
    if (!req.user) {
        res.sendStatus(401);
    }
    getProfileByEmail(req.user.toString()).then((user: User) => {
        if (user) {
            res.json(user);
        }
    }).catch((error: any) => {
        res.status(403).json(error);
    });
};