import {deleteUser, readUserByEmail} from "../database/user/user.database";
import {deleteAllSessionsForUser} from "../database/session/session.database";
import {registerUser} from "../controllers/auth/auth.controller";
import Session from "../models/session.model";
import User from "../models/user.model";
import {database} from "../database/_database";
import Follower from "../models/follower.model";
import Event from '../models/event.model';

/**
 * This file contains all of the test object entities that are used
 * in the tests written for the database queries.
 */

export const testUser: User = {
    username: "testUsername",
    email: "testEmail@gmail.com",
    name: "Test Name",
    password: "testPassword123",
    joined: new Date(),
    completed: false,
    private: false,
    city: null,
    state: null,
    country: null
};

export const testUserUpdated: User = {
    username: "testUpdated",
    email: "testEmailUpdated@gmail.com",
    name: "Test Name Updated",
    password: "testPassword123Updated",
    joined: new Date(),
    completed: true,
    private: true,
    city: "cityUpdated",
    state: "stateUpdated",
    country: "countryUpdated"
};

export const testSession: Session = {
    accessToken: "testAccessToken",
    refreshToken: "testRefreshToken",
    ip: "testIPAddress",
    agent: "testUserAgent"
};

export const generateTestUser = (n: number): User => {
    return {
        id: undefined,
        username: `TestUser${n}`,
        email: `TestUser${n}@email.com`,
        name: `Test User`,
        password: `testPassword123`,
        city: `Test City`,
        state: `Test State`,
        country: `Test Country`,
        joined: new Date(),
        private: false
    }
};
/**
 * Test database functions
 */

export const deleteTestUserFromDb = async () => {
    // get testUser id
    const testUserId = await readUserByEmail(testUser.email);
    if (testUserId) {
        await deleteAllSessionsForUser(testUserId.id);
        // delete user record from database
        await deleteUser(testUserId.id);
    }

    // get testUserUpdated id
    const testUserUpdateId = await readUserByEmail(testUserUpdated.email);
    if (testUserUpdateId) {
        await deleteAllSessionsForUser(testUserUpdateId.id);
        // delete user record from database
        await deleteUser(testUserUpdateId.id);
    }
};

export const addTestUserToDb = async (n: number): Promise<User> => {
    const user = generateTestUser(n);
    user.id = await database<User>('Users')
        .insert(user);
    if (user.id) {
        return user;
    }
    throw 'Error adding test user to database.'
};

export const deleteTestUsersFromDb = async () => {
    // Clear foreign key restraints that prevent deletion of User records
    await database<User>('Users')
        .where('username', 'like', 'TestUser%')
        .then(async (results: any) => {
            for (let i = 0; i < results.length; i++) {
                await deleteFollowersFromUser(results[i].id);
                await deleteSessionsFromUser(results[i].id);
            }
        })
        .catch((error) => {
            throw error;
        });

    // Delete all test users from database
    await database<User>('Users')
        .delete()
        .where('username', 'like', 'TestUser%')
        .catch((error) => {
            throw error;
        });
};

const deleteFollowersFromUser = async (userId: number) => {
    await database<Follower>('UserFollowsUser')
        .delete()
        .where({userId: userId})
        .catch((error) => {
            throw error;
        });
};

const deleteSessionsFromUser = async (userId: number) => {
    await database<Session>('Sessions')
        .delete()
        .where({userId: userId})
        .catch((error) => {
            throw error;
        });
};

export const registerTestUserToDb = async (): Promise<Session> => {
    return await registerUser(testUser, "test", "test");
};

// event database functions

export const deleteTestEventFromDb = async () => {
    await database<Event>('Events')
        .delete()
        .where({title: 'TestEvent'})
        .catch((error) => {
            throw error;
        });
};