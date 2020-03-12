import supertest, {Response} from "supertest";
import app from '../../index';
import {testSession, testUser} from "../../models/_testModels.model";
import {readUserByEmail} from "../../database/user/user.database";
import {deleteAllSessionsForUser} from "../../database/session/session.database";
import {deleteTestUserFromDb} from "../../util/test.util";

const request = supertest(app);

beforeAll(async () => {
    await deleteTestUserFromDb();
});

afterAll(async () => {
    await deleteTestUserFromDb();
});

describe('auth.controller.spec.ts', () => {
    it('Sends valid register and receives session', async done => {
        const register = {
            email: testUser.email,
            username: testUser.username,
            password: testUser.password
        };
        const response: Response = await request
            .post('/api/auth/register')
            .send(register);
        expect(response.status).toEqual(200);
        expect(response.body.accessToken).not.toBeNull();
        expect(response.body.refreshToken).not.toBeNull();

        // delete the newly created session
        const testUserId = await readUserByEmail(testUser.email);
        if (testUserId) {
            await deleteAllSessionsForUser(testUserId.id);
        }
        done();
    });

    it('Sends duplicate register and receives message', async done => {
        let register = {
            email: testUser.email,
            username: testUser.username,
            password: testUser.password
        };
        // send duplicate username
        let response: Response = await request
            .post('/api/auth/register')
            .send(register);
        expect(response.status).toEqual(500);
        expect(response.body).toEqual('A user with that username already exists.');
        // send duplicate email
        register.username = testUser.username + "_updated";
        response = await request
            .post('/api/auth/register')
            .send(register);
        expect(response.status).toEqual(500);
        expect(response.body).toEqual('A user with that email address already exists.');
        done();
    });

    it('Sends invalid username in register and fails', async done => {
        let register = {
            email: testUser.email,
            username: "",
            password: testUser.password
        };
        let response: Response = await request
            .post('/api/auth/register')
            .send(register);
        expect(response.status).toEqual(500);
        expect(response.body).toEqual('Enter a valid username.');
        done();
    });

    it('Sends invalid email in register and fails', async done => {
        let register = {
            email: "invalidEmail",
            username: testUser.username,
            password: testUser.password
        };
        let response: Response = await request
            .post('/api/auth/register')
            .send(register);
        expect(response.status).toEqual(500);
        expect(response.body).toEqual('Enter a valid e-mail address.');
        done();
    });

    it('Sends valid login and receives session', async done => {
        const login = {
            email: testUser.email,
            username: testUser.username,
            password: testUser.password
        };
        const response: Response = await request
            .post('/api/auth/login')
            .send(login);
        expect(response.status).toEqual(200);
        expect(response.body.accessToken).not.toBeNull();
        expect(response.body.refreshToken).not.toBeNull();
        // set testSession tokens
        testSession.accessToken = response.body.accessToken;
        testSession.refreshToken = response.body.refreshToken;
        done();
    });

    it('Logs out user and deletes all sessions', async done => {
        const response = await request
            .get('/api/auth/logout')
            .set('authorization', testSession.accessToken);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual('Successfully logged out user.');
        done();
    });

    it('Fails to logout due to unauthorized request', async done => {
        const response = await request.get('/api/auth/logout');
        expect(response.status).toEqual(401);
        done();
    });

    it('Sends invalid login and receives message', async done => {
        const login = {
            email: "this_email_doesnt_exist",
            username: testUser.username,
            password: "this_password_is_invalid"
        };
        const response: Response = await request
            .post('/api/auth/login')
            .send(login);
        expect(response.status).toEqual(401);
        expect(response.body).toEqual('Invalid email address or password.');
        done();
    });
});