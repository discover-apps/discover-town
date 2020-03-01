import mongoose from "mongoose";
import {User} from '../models/user.model';
import EmailValidator from 'email-validator';
import {Session} from "../models/session.model";
import {createSession} from "./session.database";

mongoose.connect('mongodb://localhost:27017/discover-town', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/**
 * When given a valid email and password combination, creates a User object in the database.
 * @param email
 * @param password
 */
export const registerUser = async (email: string, password: string): Promise<User> => {
    // check if email or password are null
    if (!email || !password) {
        throw 'Invalid E-mail address or Password.';
    }

    // check if email is invalid
    if (!EmailValidator.validate(email)) {
        throw 'Invalid E-mail address.';
    }

    // check if database already contains E-mail address
    let user: any = await User.findOne({email});
    if (user) {
        throw 'E-mail already in use.';
    }

    // create user object
    user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: password
    });

    // save user object to database
    return user.save();
};

/**
 * When given a valid email and password combination, creates a session object in the database
 * @param email
 * @param password
 */
export const loginUser = async (email: string, password: string): Promise<Session> => {
    let user: any = await User.findOne({email, password});
    if (user) {
        return await createSession(email);
    }

    throw 'User with those credentials not found.';
};