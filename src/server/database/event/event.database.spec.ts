import Event from '../../models/event.model';
import {createEvent} from "./event.database";
import {deleteTestEventFromDb} from "../../util/test.util";

describe('Tests event database functions', () => {
    beforeAll(async () => {
        await deleteTestEventFromDb();
    });
    afterAll(async () => {
        await deleteTestEventFromDb();
    });
    describe('Tests create event functions', async () => {
        it('Successfully creates an event record', async done => {
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
            await createEvent(testEvent).then((result: string) => {
                expect(result).not.toBeNull();
                expect(result).toEqual('Successfully created event record.');
            }).catch((error) => {
                expect(error).toBeNull();
            });
            done();
        });
        it('Fails to create an event record with invalid Title', async () => {

        });
    });
});