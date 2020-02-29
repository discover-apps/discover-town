import mongoose from "mongoose";
import {Session} from "../models/session.model";

const jwt = require('jsonwebtoken');

const TOKEN_SECRET_1 = "a16a6b854feb30347742ae9e90ec9e02";
const TOKEN_SECRET_2 = "a16a6b854feb30347742ae9e90ec9e02";

mongoose.connect('mongodb://localhost:27017/discover-town', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const createSession = (email: String): Promise<Session> => {
    const session: any = new Session({
        email: email,
        refreshToken: null, // add generated token here
        accessToken: null // add generated token here
    });
    throw 'Error creating session.'
};

const generateToken = (email: string, secret: strigg) => {
    return jwt.sign(email, TOKEN_SECRET, {expiresIn: '15m'})
};