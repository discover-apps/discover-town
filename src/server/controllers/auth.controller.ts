import {Request, Response} from 'express';
import {registerUser} from '../database/users.database';
import {User} from "../models/user.model";

export const login = (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        res.status(200).json({
            message: "Succesfully logged in"
        });
    }
    res.status(400).json({
        message: "Failed to login"
    })
};

export const register = (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    // attempt to register the user with the following data
    registerUser(email, password).then((user: User) => {
        res.status(200).json(user);
    }).catch((error: any) => {
        res.status(300).json(error);
    })
};