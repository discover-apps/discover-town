import app from '../../index';
import supertest, {Response} from "supertest";
import {deleteTestUserFromDb, registerTestUserToDb} from "../../util/test.util";
import {testUser} from "../../models/_testModels.model";
import Session from "../../models/session.model";

const request = supertest(app);

let session: Session = undefined;
beforeAll(async () => {
    await deleteTestUserFromDb();
    session = await registerTestUserToDb();
});
afterAll(async () => {
    await deleteTestUserFromDb();
});

describe('Sends GET Request to /api/user/:username', () => {
    it('Gets user from current authorized session', async done => {
        const response: Response = await request
            .get('/api/user')
            .set('authorization', session.accessToken);
        expect(response.status).toEqual(200);
        expect(response.body.email).toEqual(testUser.email);
        expect(response.body.username).toEqual(testUser.username);
        done();
    });

    it('Gets user from database by username', async done => {
        const response: Response = await request
            .get(`/api/user/profile?username=${testUser.username}`);
        expect(response.status).toEqual(200);
        expect(response.body.email).toEqual(testUser.email);
        expect(response.body.username).toEqual(testUser.username);
        done();
    });
});