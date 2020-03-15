import {Request, Response} from "express";
import {
    addUserFollower,
    readUserById,
    readUserByUsername,
    removeUserFollower,
    updateUser,
    userFollowsUser
} from "../../database/user/user.database";
import User from "../../models/user.model";

export const getCurrentProfile = (req: Request, res: Response) => {
    // get user id from req
    const userId = Number.parseInt(req.user.toString());
    // get user record from database
    readUserById(userId).then((user: User) => {
        res.status(200).json({email: user.email, username: user.username});
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const getUserProfile = (req: Request, res: Response) => {
    // get user username from req body
    const username: string = req.query.username;
    // get user database record
    readUserByUsername(username).then((user: User) => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(500).json(error);
    })
};

export const editUserProfile = (req: Request, res: Response) => {
    // get user id from req
    const userId = Number.parseInt(req.user.toString());
    // get user object from req body
    const user: User = req.body;
    // update user record in database
    updateUser(userId, user).then((rowsAffected) => {
        res.status(200).json('Successfully update profile.');
    }).catch((error) => {
        res.status(500).json(error);
    })
};

export const followUser = async (req: Request, res: Response) => {
    // get user id from req
    const userId = Number.parseInt(req.user.toString());
    const user = await readUserById(userId);
    // get target username from req body
    const targetUsername = req.body.username;
    // update follower record in database
    await addUserFollower(targetUsername, user.username).then((result: string) => {
        res.status(200).json({message: result});
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const unfollowUser = async (req: Request, res: Response) => {
    // get user id from req
    const userId = Number.parseInt(req.user.toString());
    const user = await readUserById(userId);
    // get target username from req body
    const targetUsername = req.body.username;
    // update follower record in database
    await removeUserFollower(targetUsername, user.username).then((result: string) => {
        res.status(200).json(result);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const followsUser = async (req: Request, res: Response) => {
    // get user id from req
    const userId = Number.parseInt(req.user.toString());
    const user = await readUserById(userId);
    // get target username from req body
    const targetUsername: string = req.body.username;
    // update follower record in database
    await userFollowsUser(user.username, targetUsername).then((result: boolean) => {
        res.status(200).json(result);
    }).catch((error) => {
        res.status(500).json(error);
    })
};