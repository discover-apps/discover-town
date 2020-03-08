import mongoose from "mongoose";
import {RegisterUser, User} from '../models/user.model';
import EmailValidator from 'email-validator';
import {Session} from "../models/session.model";
import {createSession} from "./session.database";

mongoose.connect('mongodb://localhost:27017/discover-town', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/**
 * When given a valid RegisterUser object, returns a User record
 * @param user
 * @param ip
 * @param agent
 */
export const registerUser = async (user: RegisterUser, ip: any, agent: string): Promise<Session> => {
    // check if email or password are null
    if (!user.email || !user.password) {
        throw 'Invalid E-mail address or Password.';
    }

    // check if name is null
    if (!user.name) {
        throw 'Invalid name.'
    }

    // check if password matches confirm password
    if (user.password != user.confirm) {
        throw 'Passwords do not match.'
    }

    // check if email is invalid
    if (!EmailValidator.validate(user.email)) {
        throw 'Invalid E-mail address.';
    }

    // check if database already contains E-mail address
    let newUser: any = await User.findOne({email: user.email});
    if (newUser) {
        throw 'E-mail already in use.';
    }

    // create user object
    newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name: user.name,
        email: user.email,
        password: user.password
    });

    // save user object to database
    await newUser.save();

    // log user into system
    return loginUser(user.email, user.password, ip, agent);
};

/**
 * When given a valid email and password combination, creates a session object in the database
 * @param email
 * @param password
 * @param ip
 * @param userAgent
 */
export const loginUser = async (email: string, password: string, ip: any, userAgent: any): Promise<Session> => {
    // check if email or password are null
    if (!email || !password) {
        throw 'Invalid E-mail address or Password.';
    }

    let user: any = await User.findOne({email, password});
    if (user) {
        return await createSession(email, ip, userAgent);
    }

    throw 'User with those credentials not found.';
};

/**
 * When given a valid email, returns the corresponding UserModel record.
 * @param email
 */
export const getProfileByEmail = async (email: string): Promise<User> => {
    let user: any = await User.findOne({email});
    if (user) {
        return await user;
    }
    throw 'Error retrieving user credentials.';
};