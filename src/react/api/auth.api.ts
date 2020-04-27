import axios, {AxiosResponse} from "axios";
import {Session} from "../models/session.model";
import {RegisterUser} from "../models/user.model";
import {http} from "./_api";

const baseUrl = "http://localhost:3000/api";

/**
 * Takes a email and password combination and returns a refresh token if credentials are valid
 * @param email
 * @param password
 */
export const loginUser = async (email: string, password: string): Promise<Session> => {
    const response: AxiosResponse<Session> = await axios.post(baseUrl + "/auth/login", {email, password});
    if (response.status == 200) {
        return response.data;
    }
    throw response;
};

/**
 * Takes a user object and returns a refresh token if email is not already taken.
 * @param user
 */
export const registerUser = async (user: RegisterUser): Promise<Session> => {
    if (user.password.length < 5 || user.password.length > 32) {
        throw "Password must be between 5 and 32 characters."
    }
    if (user.password != user.confirm) {
        throw "Passwords must match."
    }
    const response: AxiosResponse<Session> = await axios.post(baseUrl + "/auth/register", user);
    if (response.status == 200) {
        return response.data;
    }
    throw response;
};

/**
 * Takes a session object and returns true if session is valid and belongs to admin.
 * @param session
 */
export const verifyAdmin = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        http.post(baseUrl + "/auth/verifyAdmin").then((response: AxiosResponse<boolean>) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
};