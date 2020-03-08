import {AxiosResponse} from "axios";
import {UserModel} from "../models/user.model";
import {http} from './_api';

/**
 * Sends a request to the UserModel API that returns a user if the request is authenticated.
 */
export const getUserProfile = async (): Promise<UserModel> => {
    const response: AxiosResponse<UserModel> = await http.get('user/profile');
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error retrieving UserModel profile.';
};