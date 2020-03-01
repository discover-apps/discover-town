import {Request, Response} from 'express';
import {loginUser, registerUser} from '../database/users.database';
import {User} from "../models/user.model";
import {Session} from "../models/session.model";

export const login = (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    loginUser(email, password).then((session: Session) => {
        res.status(200).json({refreshToken: session.refreshToken});
    }).catch((error: any) => {
        res.status(300).json(error);
    })
};

export const register = (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    registerUser(email, password).then((user: User) => {
        res.status(200).json(user);
    }).catch((error: any) => {
        res.status(300).json(error);
    });
};