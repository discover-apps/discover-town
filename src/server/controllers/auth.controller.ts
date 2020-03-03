import {Request, Response} from 'express';
import {loginUser, registerUser} from '../database/users.database';
import {User} from "../models/user.model";
import {Session} from "../models/session.model";

export const login = (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    loginUser(email, password, ipAddress, userAgent).then((session: Session) => {
        res.status(200).json({accessToken: session.accessToken, refreshToken: session.refreshToken});
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