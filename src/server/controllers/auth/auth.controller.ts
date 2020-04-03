import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import emailValidator from 'email-validator';
import User from "../../models/user.model";
import Session from "../../models/session.model";
import {createUser, readUserByEmail} from "../../database/user/user.database";
import {
    createSession,
    deleteAllSessionsForUser,
    readSessionByAccessToken,
    readSessionById
} from "../../database/session/session.database";
import {JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET} from "../../../util/secrets";

export const login = async (req: Request, res: Response) => {
    // get user information from request body
    const user: User = {
        email: req.body.email,
        password: req.body.password
    };
    // get client information from request headers
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'][0] : 'unknown';
    const agent = req.headers['user-agent'];

    loginUser(user, ip, agent).then((session: Session) => {
        res.status(200).json(session);
    }).catch((error) => {
        res.status(401).json(error);
    });
};

export const register = (req: Request, res: Response) => {
    // get user information from request body
    const user: User = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        joined: new Date()
    };
    // get client information from request headers
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'][0] : 'unknown';
    const agent = req.headers['user-agent'];

    registerUser(user, ip, agent).then((session: Session) => {
        res.status(200).json(session);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const logout = (req: Request, res: Response) => {
    // get user email from request object
    const userId: number = Number.parseInt(req.user.toString());

    deleteAllSessionsForUser(userId).then((affectedRows: number) => {
        res.status(200).json('Successfully logged out user.');
    }).catch((error) => {
        res.status(500).json(error);
    })
};

export const authenticateSession = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    // Check if request has a auth token
    if (!token) {
        return res.sendStatus(401);
    }

    // Verify that the auth token has not been tampered
    jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, async (err, user: User) => {
        if (err) {
            return res.sendStatus(403);
        }

        // Check the database to see if this session exists (if exists, session is valid)
        const session: Session = await readSessionByAccessToken(token);
        if (!session) {
            return res.sendStatus(403);
        }

        // Attach the user to the request object
        req.user = user.id;
        next();
    });
};

export const loginUser = (user: User, ip: string, agent: string): Promise<Session> => {
    return new Promise<Session>(async (resolve, reject) => {
        const userRecord = await readUserByEmail(user.email);
        if (userRecord && user.password == userRecord.password) {
            // create a session object
            const session: Session = {
                userId: userRecord.id,
                accessToken: generateAccessToken(userRecord.id.toString()),
                refreshToken: generateRefreshToken(userRecord.id.toString()),
                ip: ip,
                agent: agent
            };
            // store session object in database
            createSession(session).then(async (sessionId) => {
                const sessionRecord = await readSessionById(sessionId);
                resolve(sessionRecord);
            }).catch((error) => {
                reject(error);
            });
        } else {
            reject('Invalid email address or password.');
        }
    });
};

export const registerUser = (user: User, ip: string, agent: string): Promise<Session> => {
    return new Promise<Session>(async (resolve, reject) => {
        // check is username is valid
        if (user.username == "") {
            reject("Enter a valid username.");
        }

        // check if email is valid
        if (!emailValidator.validate(user.email)) {
            reject("Enter a valid e-mail address.");
        }

        // create user record in database
        createUser(user).then((userId: number) => {
            // login user
            loginUser(user, ip, agent).then((session) => {
                resolve(session);
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            reject(error);
        });
    });
};

const generateAccessToken = (userId: string) => {
    return jwt.sign({id: userId}, JWT_ACCESS_TOKEN_SECRET, {expiresIn: '30d'});
};

const generateRefreshToken = (userId: string) => {
    return jwt.sign({id: userId}, JWT_REFRESH_TOKEN_SECRET);
};