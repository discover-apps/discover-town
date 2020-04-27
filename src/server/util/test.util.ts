import Session from "../models/session.model";
import User from "../models/user.model";
import {database} from "../database/_database";
import Follower from "../models/follower.model";
import Event, {UserAttendingEvent} from "../models/event.model";
import {UserHostingEvent} from "../../react/models/event.model";

/**
 * This file contains all of the test object entities that are used
 * in the tests written for the database queries.
 */

export const testSession: Session = {
    accessToken: "testAccessToken",
    refreshToken: "testRefreshToken",
    ip: "testIPAddress",
    agent: "testUserAgent"
};

export const generateTestUser = (n: number): User => {
    return new User({
        id: undefined,
        username: `TestUser${n}`,
        email: `TestUser${n}@email.com`,
        password: "testPassword123",
        city: "Test City",
        state: "Test State",
        country: "Test Country",
        joined: new Date()
    });
};

export const generateTestEvent = (): Event => {
    let testEvent: Event = {
        title: "TestEvent",
        description: "This is a test event",
        address_name: "Empire State Building",
        address_location: "20 W 34th St, New York, NY 10001",
        dateStart: new Date(),
        datePosted: new Date(),
        lat: 40.7127753,
        lon: -74.0059728
    };
    testEvent.dateStart.setDate(testEvent.dateStart.getDate() + 1);
    return testEvent;
};

/**
 * Test database functions
 */

export const addTestUserToDb = async (n: number): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        let user = generateTestUser(n);
        database<User>("Users")
            .insert(user)
            .then((userId) => {
                user.id = userId[0];
                resolve(user);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const deleteTestUsersFromDb = async () => {
    // Clear foreign key restraints that prevent deletion of User records
    await database<User>("Users")
        .where("username", "like", "TestUser%")
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
    await database<User>("Users")
        .delete()
        .where("username", "like", "TestUser%")
        .catch((error) => {
            throw error;
        });
};

const deleteFollowersFromUser = async (userId: number) => {
    await database<Follower>("UserFollowsUser")
        .delete()
        .where({userId: userId})
        .catch((error) => {
            throw error;
        });
};

const deleteSessionsFromUser = async (userId: number) => {
    await database<Session>("Sessions")
        .delete()
        .where({userId: userId})
        .catch((error) => {
            throw error;
        });
};

// event database functions

export const addTestEventToDb = async (userId: number): Promise<Event> => {
    return new Promise<Event>(async (resolve, reject) => {
        // create test event
        let event: Event = generateTestEvent();
        database<Event>("Events")
            .insert(event)
            .then((eventId: any) => {
                // insert record into UserHostingEvent table
                database<UserHostingEvent>("UserHostingEvent")
                    .insert({
                        userId: userId,
                        eventId: eventId[0]
                    }).catch(error => {
                    reject(error);
                });
                resolve({...event, id: eventId[0]});
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const deleteTestEventFromDb = async () => {
    // get Event Ids from Event table
    const ids: number[] = [];
    await database<Event>("Events")
        .select()
        .where({title: "TestEvent"})
        .then((records: any) => {
                for (let i = 0; i < records.length; i++) {
                    ids.push(records[i].id);
                }
            }
        )
        .catch((error) => {
            throw error;
        });
    // delete all records from UserHostingEvent table
    await database<UserHostingEvent>("UserHostingEvent")
        .delete()
        .whereIn("eventId", ids)
        .catch((error) => {
            throw error;
        });
    // delete all records from UserAttendingEvent table
    await database<UserAttendingEvent>("UserAttendingEvent")
        .delete()
        .whereIn("eventId", ids)
        .catch((error) => {
            throw error;
        });
    // delete all records from Events table
    await database<Event>("Events")
        .delete()
        .where({title: "TestEvent"})
        .catch((error) => {
            throw error;
        });
};