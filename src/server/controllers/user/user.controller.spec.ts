import app from '../../index';
import supertest, {Response} from "supertest";
import {deleteTestUserFromDb, registerTestUserToDb} from "../../util/test.util";
import {testUser, testUserUpdated} from "../../models/_testModels.model";
import Session from "../../models/session.model";
import {createUser, readUserByUsername} from "../../database/user/user.database";
import User from "../../models/user.model";

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

    it('Updates user in database', async done => {
        let updatedUser = {...testUserUpdated};
        const response: Response = await request
            .post('/api/user/edit')
            .send(updatedUser)
            .set('authorization', session.accessToken);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual('Successfully update profile.');

        // verify changes
        let user: User = await readUserByUsername(updatedUser.username);
        expect(user).not.toBeNull();
        user = {...user, id: undefined, joined: undefined};
        updatedUser = {...updatedUser, id: undefined, joined: undefined};
        expect(user).toEqual(updatedUser);
        done();
    });

    it('Fails to update user in database', async done => {
        // insert testUserUpdate into database
        await createUser(testUser);
        // attempt to update duplicate username
        let response: Response = await request
            .post('/api/user/edit')
            .send({...testUserUpdated, username: testUser.username})
            .set('authorization', session.accessToken);
        expect(response.status).toEqual(500);
        expect(response.body).toEqual('A user with that username already exists.');
        // attempt to update duplicate email
        response = await request
            .post('/api/user/edit')
            .send({...testUserUpdated, email: testUser.email})
            .set('authorization', session.accessToken);
        expect(response.status).toEqual(500);
        expect(response.body).toEqual('A user with that email address already exists.');
        done();
    });
});