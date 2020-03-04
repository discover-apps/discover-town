import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import {Session} from "../models/session.model";
import {JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET} from "../../util/secrets";
import {NextFunction, Request, Response} from "express";

mongoose.connect('mongodb://localhost:27017/discover-town', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export const createSession = (email: string, ip: any, userAgent: any): Promise<Session> => {
    const session: any = new Session({
        email: email,
        accessToken: generateAccessToken(email),
        refreshToken: generateRefreshToken(email),
        ipAddress: ip,
        userAgent: userAgent
    });

    return session.save();
};

const deleteSession = (token: string): Promise<Session> => {
    throw 'Error deleting session.';
};

export const authenticateSession = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        // req.email = user.toString();
        next();
    });
};

export const refreshSession = async (req: Request, res: Response) => {
    let refreshToken: any = req.body.refreshToken;
    if (!refreshToken) {
        res.sendStatus(401);
    }
    // check if refreshToken exists in database
    let doc = await Session.findOne({refreshToken});
    if (!doc) {
        res.sendStatus(403);
    }
    // verify jwt
    jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            res.sendStatus(403);
        }

        const accessToken = generateAccessToken(user.email);
        res.json({accessToken});
    });
};

const generateAccessToken = (email: string) => {
    return jwt.sign({email}, JWT_ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
};

const generateRefreshToken = (email: string) => {
    return jwt.sign({email}, JWT_REFRESH_TOKEN_SECRET);
};