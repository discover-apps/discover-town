import axios from 'axios';

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
 * @param jwt
 */
export const modifyHttpHeader = (jwt: string): void => {
    http = axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        headers: jwt ? {'Authorization': jwt} : {}
    });
};