import axios, {AxiosResponse} from 'axios';

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

    http.interceptors.response.use((config: AxiosResponse<any>) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return config;
    }, (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        const status = error.response.status;
        if (status === 401 || status === 403) {
            // TODO: delete JWT from Redux store and Localstorage
        }
        throw error;
    });
};