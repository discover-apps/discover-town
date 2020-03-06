import {deleteAccessToken, setAccessToken} from "../store/actions/auth.action";
import store from "../store/store";
import {modifyHttpHeader} from "../api/_api";

/**
 * Authorizes a client given a session. Sets accessToken in redux store, sets
 * authorization header in http requests, and saves accessToken in localstorage.
 * @param token
 */
export const authorizeClient = (token: string): Promise<void> => {
    // add accessToken to redux store
    store.dispatch(setAccessToken(token));
    // add accessToken to localstorage
    localStorage.setItem("accessToken", token);
    // add accessToken to http authorization header
    modifyHttpHeader(token);
    return;
};

/**
 * Deauthorizes a client. Removes accessToken in redux store, removes authorization
 * header from http requests, and removes accessToken from localstorage.
 */
export const deauthorizeClient = (): Promise<void> => {
    // remove accessToken to redux store
    store.dispatch(deleteAccessToken());
    // remove accessToken from localstorage
    localStorage.removeItem("accessToken");
    // remove accessToken from http authorization header
    modifyHttpHeader(undefined);
    return;
};

/**
 * Gets the accessToken (if any) that is stored in localstorage, and then
 * attempts to authenticate the client with said accessToken.
 */
export const loadClientAuthorization = async (): Promise<void> => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        return authorizeClient(token);
    } else {
        return deauthorizeClient();
    }
};