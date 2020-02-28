import mongoose from "mongoose";
import {User} from '../models/user.model';
import EmailValidator from 'email-validator';
import {Session} from "../models/session.model";

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
        throw ('Invalid E-mail address or Password.');
    }

    // check if email is invalid
    if (!EmailValidator.validate(email)) {
        throw ('Invalid E-mail address.');
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
 * When given a valid email and password combination, creates a Session object in the database
 * @param email
 * @param password
 */
export const loginUser = async (email: string, password: string): Promise<Session> => {
    return new Promise<Session>(async (resolve, reject) => {
        // TODO: explicity set user type
        // TODO: rewrite Promise correctly
        await User.findOne({email, password}).then((user: any) => {
            if (user) {
                const session: Session = {
                    accessToken: "testAccess",
                    refreshToken: "testRefresh"
                };
                return resolve(session);
            }
        });

        return reject('User not found');
    });
};