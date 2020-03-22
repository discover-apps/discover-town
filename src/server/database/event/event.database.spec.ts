import {createEvent} from "./event.database";
import {addTestUserToDb, deleteTestEventFromDb, deleteTestUsersFromDb, generateTestEvent} from "../../util/test.util";
import User from "../../models/user.model";

describe('Tests event database functions', () => {
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
    describe('Tests Create Functions', () => {
        const testEvent = generateTestEvent();
        it('Successfully creates an event record', async done => {
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
});