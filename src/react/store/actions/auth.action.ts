import {User} from "../../models/user.model";

export const setAccessToken = (token: string) => ({
    type: 'SET_TOKEN',
    accessToken: token
});

export const deleteAccessToken = () => ({
    type: 'DELETE_TOKEN'
});

export const setCurrentUser = (user: User) => ({
    type: 'SET_USER',
    currentUser: user
});

export const deleteCurrentUser = () => ({
    type: 'DELETE_USER'
});