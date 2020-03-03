import {Request, Response} from 'express';
import {getProfileByEmail} from "../database/users.database";

export const secretMessage = (req: Request, res: Response) => {
    res.json({message: "Hello World!"});
};

export const getProfile = async (req: Request, res: Response) => {
    const email = req.email;
    if (!email) {
        res.sendStatus(401);
    }
    const user = await getProfileByEmail(email);
    if (user) {
        res.json(user);
    }
    res.sendStatus(400);
};