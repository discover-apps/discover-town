import {Request, Response} from 'express';

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