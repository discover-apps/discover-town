import axios, {AxiosResponse} from "axios";
import {Session} from "../models/session.model";

const baseUrl = "http://localhost:3000/api";

/**
 * Takes a email and password combination and returns a refresh token if credentials are valid
 * @param email
 * @param password
 */
export const loginUser = async (email: string, password: string): Promise<Session> => {
    const response: AxiosResponse<Session> = await axios.post(baseUrl + '/login', {email, password});
    if (response.status == 200) {
        return response.data;
    }
    throw response;
};