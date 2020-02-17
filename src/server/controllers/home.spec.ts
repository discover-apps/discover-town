import app from '../index';
import supertest, {Response} from 'supertest';

const request = supertest(app);

it('Gets the home endpoint', async done => {
    // Sends GET Request to /api/ endpoint
    const response: Response = await request.get('/api/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to Express-Typescript!');
    done();
});