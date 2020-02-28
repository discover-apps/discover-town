import app from '../index';
import supertest, {Response} from "supertest";
import {User} from "../models/user.model";

const request = supertest(app);

const exampleUser: User = {
    _id: '123',
    email: 'jason@gmail.com',
    password: 'password123'
};

describe('POST /user', () => {
    it('responds with successful login', async done => {
        // Sends POST Request to /api/login endpoint
        const body = {
            email: exampleUser.email,
            password: exampleUser.password
        };
        const response: Response = await request
            .post('/api/login')
            .send(body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Welcome to Express-Typescript!');
        done();
    });

    it('responds with unsuccessful login', async done => {
        // Sends POST Request to /api/login endpoint
        const body = {
            email: 'asdf@gmail.com',
            password: 'test'
        };
        const response: Response = await request
            .post('/api/login')
            .send(body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Welcome to Express-Typescript!');
        done();
    });
});