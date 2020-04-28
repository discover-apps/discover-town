import {AxiosResponse} from "axios";
import {User} from "../models/user.model";
import {http} from "./_api";
import {Event} from "../models/event.model";

export const readCurrentUser = async (): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        http.get("user").then((response: AxiosResponse<User>) => {
            resolve(response.data);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == "string") {
                reject(error.response.data);
            } else {
                reject("An unknown error occurred when retrieving current user.");
            }
        });
    });
};

export const readUserByUsername = async (username: string): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        http.post("user/readByUsername", {username}).then((response: AxiosResponse<User>) => {
            resolve(response.data);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == "string") {
                reject(error.response.data);
            } else {
                reject("An unknown error occurred when retrieving user record from username.");
            }
        });
    });
};

export const editUserProfile = async (user: User): Promise<string> => {
    const response: AxiosResponse<string> = await http.post("user/edit", user);
    if (response.status == 200) {
        return response.data;
    }
    throw "Error updating user profile.";
};

export const followUser = async (user: User): Promise<string> => {
    const response: AxiosResponse<string> = await http.post("user/follow", user);
    if (response.status == 200) {
        return response.data;
    }
    throw "Error following user.";
};

export const unfollowUser = async (user: User): Promise<string> => {
    const response: AxiosResponse<string> = await http.post("user/unfollow", user);
    if (response.status == 200) {
        return response.data;
    }
    throw "Error unfollowing user.";
};

export const userFollowsUser = async (user: User): Promise<boolean> => {
    const response: AxiosResponse<boolean> = await http.post("user/follows", user);
    if (response.status == 200) {
        return response.data;
    }
    throw "Error checking if user follows user.";
};

export const readUserFollowerCount = async (user: User): Promise<number> => {
    const response: AxiosResponse<number> = await http.post("user/followercount", user);
    if (response.status == 200) {
        return response.data;
    }
    throw "Error getting follower count for user."
};

export const getUserFollowers = async (user: User): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await http.post("user/followers", user);
    if (response.status == 200) {
        return response.data;
    }
    throw "Error getting followers for user.";
};

export const getUserFollowing = async (user: User): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await http.post("user/following", user);
    if (response.status == 200) {
        return response.data;
    }
    throw "Error getting users that user follows.";
};

export const readUserByEvent = (event: Event): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        http.post("/user/readByEvent", event).then((response: AxiosResponse<User>) => {
            resolve(response.data);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == "string") {
                reject(error.response.data);
            } else {
                reject("An unknown error occurred when retrieving user records for event.");
            }
        });
    })
};

export const banUser = async (user: User, banned: boolean): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        http.post("/user/banUserById", {userId: user.id, banned: banned}).then((response: AxiosResponse<number>) => {
            resolve(response.data);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == "string") {
                reject(error.response.data);
            } else {
                reject("An unknown error occurred when retrieving user records for event.");
            }
        });
    });
};