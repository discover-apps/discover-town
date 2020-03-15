import {AxiosResponse} from "axios";
import {User} from "../models/user.model";
import {http} from './_api';

export const getCurrentUser = async (): Promise<User> => {
    const response: AxiosResponse<User> = await http.get('user');
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error retrieving current user profile.';
};

export const getUserProfile = async (username: string): Promise<User> => {
    const response: AxiosResponse<User> = await http.get(`user/profile?username=${username}`);
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error retrieving UserModel profile.';
};

export const editUserProfile = async (user: User): Promise<string> => {
    const response: AxiosResponse<string> = await http.post('user/edit', user);
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error updating user profile.';
};

export const followUser = async (user: User): Promise<string> => {
    const response: AxiosResponse<string> = await http.post('user/follow', user);
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error following user.';
};

export const unfollowUser = async (user: User): Promise<string> => {
    const response: AxiosResponse<string> = await http.post('user/unfollow', user);
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error unfollowing user.';
};

export const userFollowsUser = async (user: User): Promise<boolean> => {
    const response: AxiosResponse<boolean> = await http.post('user/follows', user);
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error checking if user follows user.';
};

export const userFollowerCount = async (user: User): Promise<number> => {
    const response: AxiosResponse<number> = await http.post('user/followercount', user);
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error getting follower count for user.'
};

export const getUserFollowers = async (user: User): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await http.post('user/followers', user);
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error getting followers for user.';
};

export const getUserFollowing = async (user: User): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await http.post('user/following', user);
    if (response.status == 200) {
        return response.data;
    }
    throw 'Error getting users that user follows.';
};