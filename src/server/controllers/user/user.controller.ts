import {Request, Response} from "express";
import {readUserById} from "../../database/user/user.database";
import User from "../../models/user.model";

export const getCurrentProfile = (req: Request, res: Response) => {
    // get user id from req
    const userId = Number.parseInt(req.user.toString());
    // get user record from database
    readUserById(userId).then((user: User) => {
        res.status(200).json({email: user.email, username: user.username});
    }).catch((error) => {
        res.status(500).json(error);
    });
};