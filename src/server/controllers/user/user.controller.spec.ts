import supertest, {Response} from "supertest";
import app from '../../index';
import {deleteTestUserFromDb, registerTestUserToDb} from "../../util/test.util";
import {testUser} from "../../models/_testModels.model";
import Session from "../../models/session.model";

const request = supertest(app);

describe('Sends GET Requests to /api/user/', () => {
    let session: Session = undefined;
    beforeAll(async () => {
        await deleteTestUserFromDb();
        session = await registerTestUserToDb();
    });
    afterAll(async () => {
        await deleteTestUserFromDb();
    });
    it('Gets user from current authorized session', async done => {
        const response: Response = await request
            .get('/api/user')
            .set('authorization', session.accessToken);
        expect(response.status).toEqual(200);
        expect(response.body.email).toEqual(testUser.email);
        expect(response.body.username).toEqual(testUser.username);
        done();
    });
});