import {
    createEvent,
    createEventAttendee,
    deleteEvent,
    deleteEventAttendee,
    readAttendingByUser,
    readEventAttendees,
    readEventById,
    readEventsByUser,
    readEventsByUsersFollowing,
    updateEvent,
    userAttendingEvent
} from "./event.database";
import {
    addTestEventToDb,
    addTestUserToDb,
    deleteTestEventFromDb,
    deleteTestUsersFromDb,
    generateTestEvent
} from "../../util/test.util";
import Event from "../../models/event.model";
import User from "../../models/user.model";

describe("Tests event.database.ts", () => {
    describe("Tests createEvent", () => {
        let testUser: User = undefined;
        beforeAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
        });
        afterAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        afterEach(async () => {
            await deleteTestEventFromDb();
        });
        it("Successfully creates an event record", async done => {
            const testEvent = generateTestEvent();
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).not.toBeNull();
                expect(eventId).toEqual(eventId);
            }).catch((error: any) => {
                expect(error).toBeNull();
            });
            done();
        });
        it("Fails to create an event record with invalid Title", async done => {
            let testEvent = generateTestEvent();
            testEvent.title = "asdf";
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual("Title must be between 5-32 characters.");
            });
            testEvent.title = "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf";
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual("Title must be between 5-32 characters.");
            });
            done();
        });
        it("Fails to create an event record with invalid Description", async done => {
            let testEvent = generateTestEvent();
            testEvent.description = "asdf";
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual("Description must be between 5-1000 characters.");
            });
            done();
        });
        it("Fails to create an event record with invalid Date", async done => {
            let testEvent = generateTestEvent();
            testEvent.dateStart.setDate(testEvent.datePosted.getDate());
            testEvent.dateStart.setMinutes(testEvent.datePosted.getMinutes() - 1);
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual("Date must be greater than or equal to today.");
            });
            done();
        });
        it("Fails to create an event record with invalid Address", async done => {
            let testEvent = generateTestEvent();
            testEvent.address_location = "asdffdsalkjhhjll";
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual("Unable to locate address, please try a different address.");
            });
            done();
        });
    });
    describe("Tests updateEvent", () => {
        let testEvent: Event = undefined;
        let testUser: User = undefined;
        beforeAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
            testEvent = await addTestEventToDb(testUser.id);
        });
        afterAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        it("Successfully updates an event record.", async done => {
            await updateEvent({
                ...testEvent,
                description: "Updated description."
            }, testUser.id).then((message: string) => {
                expect(message).not.toBeNull();
                expect(message).toEqual("Successfully updated event.");
            });
            await readEventById(testEvent.id).then((event: Event) => {
                expect(event).not.toBeNull();
                expect(event.description).toEqual("Updated description.");
            });
            done();
        });
        it("Fails to update an event record with title less than 5 characters.", async done => {
            let updatedTestEvent: Event = {...generateTestEvent(), id: testEvent.id};
            updatedTestEvent.title = "asdf";
            await updateEvent(updatedTestEvent, testUser.id).then((message: string) => {
                expect(message).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual("Title must be between 5-32 characters.");
            });
            done();
        });
        it("Fails to update an event record with title too long", async done => {
            testEvent.title = "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf";
            await updateEvent(testEvent, testUser.id).then((message: string) => {
                expect(message).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual("Title must be between 5-32 characters.");
            });
            done();
        });
        it("Fails to update an event record with invalid Description", async done => {
            let updatedTestEvent: Event = {...generateTestEvent(), id: testEvent.id};
            updatedTestEvent.description = "asdf";
            await updateEvent(updatedTestEvent, testUser.id).then((message: string) => {
                expect(message).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual("Description must be between 5-1000 characters.");
            });
            done();
        });
        it("Fails to update an event record with invalid Date", async done => {
            let updatedTestEvent: Event = {...generateTestEvent(), id: testEvent.id};
            updatedTestEvent.dateStart.setDate(updatedTestEvent.datePosted.getDate());
            updatedTestEvent.dateStart.setMinutes(updatedTestEvent.datePosted.getMinutes() - 1);
            await updateEvent(updatedTestEvent, testUser.id).then((message: string) => {
                expect(message).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual("Date must be greater than or equal to today.");
            });
            done();
        });
        it("Fails to update an event record with invalid Address", async done => {
            let updatedTestEvent: Event = {...generateTestEvent(), id: testEvent.id};
            updatedTestEvent.address_location = "asdffdsalkjhhjll";
            await updateEvent(updatedTestEvent, testUser.id).then((message: string) => {
                expect(message).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual("Unable to locate address, please try a different address.");
            });
            done();
        });
    });
    describe("Tests deleteEvent", () => {
        let testEvent: Event = undefined;
        let testUser: User = undefined;
        beforeAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
            testEvent = await addTestEventToDb(testUser.id);
        });
        afterAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        it("Successfully deletes an event record", async done => {
            await deleteEvent(testEvent, testUser.id).then((message: string) => {
                expect(message).not.toBeNull();
                expect(message).toEqual("Successfully deleted event.");
            }).catch((error) => {
                expect(error).toBeNull();
            });
            await readEventById(testEvent.id).then((event: Event) => {
                expect(event).toBeUndefined();
            });
            done();
        });
    });
    describe("Tests readEventById", () => {
        let testEvent: Event = undefined;
        let testUser: User = undefined;
        beforeAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
            testEvent = await addTestEventToDb(testUser.id);
        });
        afterAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        it("Successfully reads a record by id", async done => {
            readEventById(testEvent.id).then((event: Event) => {
                expect(event).not.toBeNull();
                expect(event.title).toEqual(testEvent.title);
                expect(event.description).toEqual(testEvent.description);
                expect(event.address_name).toEqual(testEvent.address_name);
                expect(event.address_location).toEqual(testEvent.address_location);
                expect(event.dateStart instanceof Date).toBeTruthy();
                expect(event.datePosted instanceof Date).toBeTruthy();
                expect(event.lat).toEqual(testEvent.lat);
                expect(event.lon).toEqual(testEvent.lon);
            }).catch((error) => {
                expect(error).toBeNull();
            });
            done();
        });
        it("Fails to read a record that does not exist", async done => {
            readEventById(-1).then((event: Event) => {
                expect(event).toBeNull();
            }).catch((error) => {
                expect(error).toBeNull();
            });
            done();
        });
    });
    describe("Tests readEventsByUser", () => {
        // TODO: (FIX) This test runs successfully solo, but fails when running all tests...
        let testEvent: Event = undefined;
        let testUser: User = undefined;
        beforeAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
            testEvent = await addTestEventToDb(testUser.id);
        });
        afterAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        it("Successfully retrieves all event records for a user.", async done => {
            await readEventsByUser(testUser).then((events: Event[]) => {
                expect(events).not.toBeNull();
                expect(events.length).toEqual(1);
                expect(events[0].title).toEqual(testEvent.title);
            });
            done();
        });
        it("Returns a empty array for a user that does not exist", async done => {
            await readEventsByUser({...testUser, id: -1}).then((events: Event[]) => {
                expect(events).not.toBeNull();
                expect(events.length).toEqual(0);
            });
            done();
        });
    });
    describe("Tests readAttendingByUser", () => {
        let testEvent: Event = undefined;
        let testUser1: User = undefined;
        let testUser2: User = undefined;
        beforeAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser1 = await addTestUserToDb(1);
            testUser2 = await addTestUserToDb(2);
            testEvent = await addTestEventToDb(testUser1.id);
            await createEventAttendee(testEvent, testUser2);
        });
        afterAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        it("Retrieves testEvent from testUser2 Attendees.", async done => {
            await readAttendingByUser(testUser2).then((events: Event[]) => {
                expect(events).not.toBeNull();
                expect(events[0].id).toEqual(testEvent.id);
            });
            done();
        });
    });
    describe("Tests readEventsByUserFollowers", () => {
        let testEvent: Event = undefined;
        let testUser: User = undefined;
        beforeAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
            testEvent = await addTestEventToDb(testUser.id);
        });
        afterAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        it("Successfully retrieves record for testUser", async done => {
            await readEventsByUsersFollowing([testUser]).then((events: Event[]) => {
                expect(events).not.toBeNull();
                expect(events.length).toEqual(1);
                expect(events[0].title).toEqual(testEvent.title);
            });
            done();
        });
    });
    describe("Tests createEventAttendee", () => {
        let testEvent: Event = undefined;
        let testUser: User = undefined;
        let testUser2: User = undefined;
        beforeEach(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
            testUser2 = await addTestUserToDb(2);
            testEvent = await addTestEventToDb(testUser.id);
        });
        afterEach(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        it("Successfully adds an event attendee.", async done => {
            await createEventAttendee(testEvent, testUser2).then((message: string) => {
                expect(message).not.toBeNull();
                expect(message).toEqual("Successfully added event attendee.");
            });
            done();
        });
    });
    describe("Tests deleteEventAttendee", () => {
        let testEvent: Event = undefined;
        let testUser: User = undefined;
        let testUser2: User = undefined;
        beforeEach(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
            testUser2 = await addTestUserToDb(2);
            testEvent = await addTestEventToDb(testUser.id);
        });
        afterEach(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        it("Successfully removes an event attendee.", async done => {
            await createEventAttendee(testEvent, testUser2).then((message: string) => {
                expect(message).not.toBeNull();
                expect(message).toEqual("Successfully added event attendee.");
            });
            await deleteEventAttendee(testEvent, testUser2).then((message: string) => {
                expect(message).not.toBeNull();
                expect(message).toEqual("Successfully removed event attendee.");
            });
            done();
        });
    });
    describe("Tests readEventAttendees", () => {
        let testEvent: Event = undefined;
        let testUser: User = undefined;
        let testUser2: User = undefined;
        beforeEach(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
            testUser2 = await addTestUserToDb(2);
            testEvent = await addTestEventToDb(testUser.id);
        });
        afterEach(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        it("Successfully reads event attendees", async done => {
            await createEventAttendee(testEvent, testUser2).then((message: string) => {
                expect(message).not.toBeNull();
                expect(message).toEqual("Successfully added event attendee.");
            });
            await readEventAttendees(testEvent).then((users: User[]) => {
                expect(users).not.toBeNull();
                expect(users.length).toEqual(1);
                expect(users[0].id).toEqual(testUser2.id);
            });
            done();
        });
    });
    describe("Tests userAttendingEvent", () => {
        let testEvent: Event = undefined;
        let testUser: User = undefined;
        let testUser2: User = undefined;
        beforeEach(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
            testUser2 = await addTestUserToDb(2);
            testEvent = await addTestEventToDb(testUser.id);
        });
        afterEach(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
        });
        it("Successfully identifies User2 as an Attendee.", async done => {
            await createEventAttendee(testEvent, testUser2).then((message: string) => {
                expect(message).not.toBeNull();
                expect(message).toEqual("Successfully added event attendee.");
            });
            await userAttendingEvent(testEvent, testUser2).then((attending: boolean) => {
                expect(attending).not.toBeNull();
                expect(attending).toBeTruthy();
            });
            done();
        });
        it("Successfully identifies User1 as not an Attendee.", async done => {
            await createEventAttendee(testEvent, testUser2).then((message: string) => {
                expect(message).not.toBeNull();
                expect(message).toEqual("Successfully added event attendee.");
            });
            await userAttendingEvent(testEvent, testUser).then((attending: boolean) => {
                expect(attending).not.toBeNull();
                expect(attending).toBeFalsy();
            });
            done();
        });
    });
});