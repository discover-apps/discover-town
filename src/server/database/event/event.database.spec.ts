import Event from '../../models/event.model';
import {createEvent} from "./event.database";
import {deleteTestEventFromDb} from "../../util/test.util";

describe('Tests event database functions', () => {
    const createTestEvent = (): Event => {
        let testEvent: Event = {
            title: 'TestEvent',
            description: 'This is a test event',
            address_name: 'Empire State Building',
            address_location: '20 W 34th St, New York, NY 10001',
            startTime: new Date(),
            datePosted: new Date(),
            lat: 40.7127753,
            lon: -74.0059728
        };
        testEvent.startTime.setDate(testEvent.startTime.getDate() + 1);
        return testEvent;
    };
    beforeAll(async () => {
        await deleteTestEventFromDb();
    });
    afterAll(async () => {
        await deleteTestEventFromDb();
    });
    describe('Tests Create Functions', () => {
        const testEvent = createTestEvent();
        it('Successfully creates an event record', async done => {
            await createEvent(testEvent).then((result: string) => {
                expect(result).not.toBeNull();
                expect(result).toEqual('Successfully created event record.');
            }).catch((error) => {
                expect(error).toBeNull();
            });
            done();
        });
        it('Fails to create an event record with invalid Title', async done => {
            let testEvent = createTestEvent();
            testEvent.title = "asdf";
            await createEvent(testEvent).then((result: string) => {
                expect(result).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Title must be between 5-32 characters.');
            });
            testEvent.title = "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf";
            await createEvent(testEvent).then((result: string) => {
                expect(result).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Title must be between 5-32 characters.');
            });
            done();
        });
        it('Fails to create an event record with invalid Description', async done => {
            let testEvent = createTestEvent();
            testEvent.description = "asdf";
            await createEvent(testEvent).then((result: string) => {
                expect(result).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Description must be between 5-1000 characters.');
            });
            done();
        });
        it('Fails to create an event record with invalid Date', async done => {
            let testEvent = createTestEvent();
            testEvent.startTime.setDate(testEvent.datePosted.getDate());
            testEvent.startTime.setMinutes(testEvent.datePosted.getMinutes() - 1);
            await createEvent(testEvent).then((result: string) => {
                expect(result).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Date must be greater than or equal to today.');
            });
            done();
        });
        it('Fails to create an event record with invalid Address', async done => {
            let testEvent = createTestEvent();
            testEvent.address_location = 'asdffdsalkjhhjll';
            await createEvent(testEvent).then((result: string) => {
                expect(result).toBeNull();
            }).catch((error) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Unable to locate address, please try a different address.');
            });
            done();
        });
    });
});