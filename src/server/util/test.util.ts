import {deleteUser, readUserByEmail} from "../database/user/user.database";
import {deleteAllSessionsForUser} from "../database/session/session.database";
import {registerUser} from "../controllers/auth/auth.controller";
import Session from "../models/session.model";
import User from "../models/user.model";

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

export const registerTestUserToDb = async (): Promise<Session> => {
    return await registerUser(testUser, "test", "test");
};