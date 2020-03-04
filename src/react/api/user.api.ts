import {AxiosResponse} from "axios";
import {User} from "../models/user";
import {http} from './_api';


export const getUserProfile = async (): Promise<User> => {
    const response: AxiosResponse<User> = await http.get('user/profile');
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error retrieving User profile.';
};