import {Request, Response} from 'express';

export const secretMessage = (req: Request, res: Response) => {
    res.json({message: "Hello World!"});
};