import {AxiosResponse} from "axios";
import {User} from "../models/user.model";
import {http} from './_api';

/**
 * Sends a request to the UserModel API that returns a user if the request is authenticated.
 */
export const getUserProfile = async (): Promise<User> => {
    const response: AxiosResponse<User> = await http.get('user/profile');
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error retrieving UserModel profile.';
};

export const getCurrentUser = async (): Promise<User> => {
    const response: AxiosResponse<User> = await http.get('user');
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error retrieving current user profile.';
};