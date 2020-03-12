import User from "./user.model";
import Session from "./session.model";

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

export const testSession: Session = {
    accessToken: "testAccessToken",
    refreshToken: "testRefreshToken",
    ip: "testIPAddress",
    agent: "testUserAgent"
};