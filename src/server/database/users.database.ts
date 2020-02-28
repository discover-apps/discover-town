import mongoose from "mongoose";
import {User} from '../models/user.model';
import EmailValidator from 'email-validator';
import Login from "components/login/login";

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
    return new Promise(async (resolve, reject) => {
        // check if email or password are null
        if (!email || !password) {
            reject('Invalid E-mail address or Password.');
        }

        // check if email is invalid
        if (!EmailValidator.validate(email)) {
            reject('Invalid E-mail address.');
        }

        // check if database already contains E-mail address
        await User.findOne({email}).then((user: any) => {
            if (user) {
                reject('E-mail address already in use.')
            }
        });

        // create user object
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: password
        });

        // save user object to database
        await user.save().then((result: any) => {
            resolve(result);
        }).catch((error: any) => {
            reject(error);
        });
    });
};

export const loginUser = async (email: string, password: string): Promise<Login> => {
    return new Promise<Login>((resolve, reject) => {

    });
};