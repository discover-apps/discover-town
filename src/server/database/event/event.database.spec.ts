import {createEvent, readEventById} from "./event.database";
import Event from '../../models/event.model';
import {
    addTestEventToDb,
    addTestUserToDb,
    deleteTestEventFromDb,
    deleteTestUsersFromDb,
    generateTestEvent
} from "../../util/test.util";
import User from "../../models/user.model";

describe('Tests event database functions', () => {
    describe('Tests Create Function', () => {
        let testUser: User = undefined;
        beforeAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
        });
        afterAll(async () => {
            await deleteTestUsersFromDb();
            await deleteTestEventFromDb();
        });
        afterEach(async () => {
            await deleteTestEventFromDb();
        });
        it('Successfully creates an event record', async done => {
            const testEvent = generateTestEvent();
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).not.toBeNull();
                expect(eventId).toEqual(eventId);
            }).catch((error: any) => {
                expect(error).toBeNull();
            });
            done();
        });
        it('Fails to create an event record with invalid Title', async done => {
            let testEvent = generateTestEvent();
            testEvent.title = "asdf";
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Title must be between 5-32 characters.');
            });
            testEvent.title = "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf";
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Title must be between 5-32 characters.');
            });
            done();
        });
        it('Fails to create an event record with invalid Description', async done => {
            let testEvent = generateTestEvent();
            testEvent.description = "asdf";
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Description must be between 5-1000 characters.');
            });
            done();
        });
        it('Fails to create an event record with invalid Date', async done => {
            let testEvent = generateTestEvent();
            testEvent.dateStart.setDate(testEvent.datePosted.getDate());
            testEvent.dateStart.setMinutes(testEvent.datePosted.getMinutes() - 1);
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Date must be greater than or equal to today.');
            });
            done();
        });
        it('Fails to create an event record with invalid Address', async done => {
            let testEvent = generateTestEvent();
            testEvent.address_location = 'asdffdsalkjhhjll';
            await createEvent(testEvent, testUser.id).then((eventId: number) => {
                expect(eventId).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Unable to locate address, please try a different address.');
            });
            done();
        });
    });
    describe('Tests ReadById Function', () => {
        let testEvent: Event = undefined;
        let testUser: User = undefined;
        beforeAll(async () => {
            await deleteTestEventFromDb();
            await deleteTestUsersFromDb();
            testUser = await addTestUserToDb(1);
            testEvent = await addTestEventToDb(testUser.id);
        });
        afterAll(async () => {
            await deleteTestUsersFromDb();
            await deleteTestEventFromDb();
        });
        it('Successfully reads a record by id', async done => {
            readEventById(testEvent.id).then((event: Event) => {
                expect(event).not.toBeNull();
                expect(event.title).toEqual(testEvent.title);
                expect(event.description).toEqual(testEvent.description);
                expect(event.address_name).toEqual(testEvent.address_name);
                expect(event.address_location).toEqual(testEvent.address_location);
                expect(event.lat).toEqual(testEvent.lat);
                expect(event.lon).toEqual(testEvent.lon);
            }).catch((error) => {
                expect(error).toBeNull();
            });
            done();
        });
        it('Fails to read a record that does not exist', async done => {
            readEventById(-1).then((event: Event) => {
                expect(event).toBeNull();
            }).catch((error) => {
                expect(error).toBeNull();
            });
            done();
        });
    });
});