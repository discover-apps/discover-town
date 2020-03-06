import axios, {AxiosResponse} from 'axios';
import {deauthorizeClient} from "../util/auth";

export const baseUrl = 'http://localhost:3000/api/';

/**
 * The global http request object is defined below, it contains the necessary http options.
 */
export let http = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {}
});

/**
 * Allows for adjusting authorization header upon user log in and log out.
 * @param token
 */
export const modifyHttpHeader = (token: string): void => {
    http = axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        headers: token ? {'Authorization': token} : {}
    });

    http.interceptors.response.use((config: AxiosResponse<any>) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return config;
    }, async (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        const status = error.response.status;
        if (status === 401 || status === 403) {
            // Delete jwt from Redux store and Localstorage
            deauthorizeClient();
        }
        throw error;
    });
};