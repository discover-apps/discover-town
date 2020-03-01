import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import {Session} from "../models/session.model";
import {JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET} from "../../util/secrets";
import {NextFunction, Request, Response} from "express";

mongoose.connect('mongodb://localhost:27017/discover-town', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export const createSession = (email: string): Promise<Session> => {
    const session: any = new Session({
        email: email,
        accessToken: generateAccessToken(email),
        refreshToken: generateRefreshToken(email)
    });

    return session.save();
};

const refreshSession = (token: string): Promise<Session> => {
    throw 'Error refreshing session.';
};

const deleteSession = (token: string): Promise<Session> => {
    throw 'Error deleting session.';
};

const authenticateSession = (req: Request, res: Response, next: NextFunction) => {
    // TODO: Verify this is correct
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, (err, userId) => {
        if (err) {
            return res.sendStatus(403);
        }

        // req.userId = userId.toString();
        next();
    });
};

const generateAccessToken = (email: string) => {
    return jwt.sign({email}, JWT_ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
};

const generateRefreshToken = (email: string) => {
    return jwt.sign({email}, JWT_REFRESH_TOKEN_SECRET);
};