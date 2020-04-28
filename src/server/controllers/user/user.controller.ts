import {Request, Response} from "express";
import {
    addUserFollower,
    readUserByEvent,
    readUserById,
    readUserByUsername,
    readUserFollowerCount,
    readUserFollowers,
    readUserFollowing,
    removeUserFollower,
    updateUser,
    userFollowsUser
} from "../../database/user/user.database";
import User from "../../models/user.model";
import Event from "../../models/event.model";
import {authenticateAdmin} from "../../database/auth/auth.database";

export const readCurrentUser = (req: Request, res: Response) => {
    // get user id from req
    const userId = Number.parseInt(req.user.toString());
    // get user record from database
    readUserById(userId).then((user: User) => {
        res.status(200).json({...user, password: ""});
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const readByUsername = (req: Request, res: Response) => {
    // get user username from req body
    const username: string = req.body.username;
    // get user database record
    readUserByUsername(username).then((user: User) => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const editUserProfile = (req: Request, res: Response) => {
    // get user id from req
    const userId = Number.parseInt(req.user.toString());
    // get user object from req body
    const user: User = req.body;
    // update user record in database
    updateUser(userId, user).then((rowsAffected) => {
        res.status(200).json("Successfully update profile.");
    }).catch((error) => {
        res.status(500).json(error);
    });
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
    });
};

export const getFollowerCount = async (req: Request, res: Response) => {
    // get target username from req body
    const targetUsername: string = req.body.username;
    await readUserFollowerCount(targetUsername).then((count: number) => {
        res.status(200).json(count);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const getFollowers = async (req: Request, res: Response) => {
    // get target username from req body
    const targetUsername: string = req.body.username;
    await readUserFollowers(targetUsername).then((users: User[]) => {
        res.status(200).json(users);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const getFollowing = async (req: Request, res: Response) => {
    // get target username from req body
    const targetUsername: string = req.body.username;
    await readUserFollowing(targetUsername).then((users: User[]) => {
        res.status(200).json(users);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const readByEvent = async (req: Request, res: Response) => {
    // get event from req body
    const event: Event = req.body;
    readUserByEvent(event).then((user: User) => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const banUserById = async (req: Request, res: Response) => {
    // verify request is made by administrator
    const rUserId = Number.parseInt(req.user.toString());
    authenticateAdmin(rUserId).then(async () => {
        // get user id from req
        const userId = req.body.userId;
        // get ban action
        const banned = req.body.banned;
        // get user object from database
        let user = await readUserById(userId);
        user.banned = banned;
        // update user record
        updateUser(userId, user).then((rowsAffected) => {
            res.status(200).json("Successfully update profile.");
        }).catch((error) => {
            res.status(300).json(error);
        });
    }).catch((error) => {
        res.status(300).json(error);
    });
};