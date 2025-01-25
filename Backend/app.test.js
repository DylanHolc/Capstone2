process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');
const sequelize = require('./sequelize');
const User = require('./models/user');


describe('GET /', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});

describe('GET /not-a-route', () => {
    it('should return 404 Not Found', async () => {
        const response = await request(app).get('/not-a-route');
        expect(response.status).toBe(404);
    });
});

describe('GET /pokemon/cards', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/pokemon/cards');
        expect(response.status).toBe(200);
    });
});

describe('GET /mtg/cards', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/mtg/cards');
        expect(response.status).toBe(200);
    });
});

describe('GET /yugioh/cards', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/yugioh/cards');
        expect(response.status).toBe(200);
    });
});

describe('POST /users/register', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).post('/users/register').send({
            username: 'testuser',
            password: 'password',
            first_name: 'Test',
            last_name: 'User',
            email: 'testuser@mail.com'
        });
        expect(response.status).toBe(201);
    });
});

describe('POST /users/logout', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).post('/users/logout');
        expect(response.status).toBe(200);
    });
});

describe('POST /users/login', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).post('/users/login').send({
            username: 'testuser',
            password: 'password'
        });
        expect(response.status).toBe(200);
    });
});

describe('GET /users/:username', () => {
    it('should return 401 Unauthorized', async () => {
        const response = await request(app).get('/users/testuser');
        expect(response.status).toBe(401);
    });
});

describe('DELETE /users/:username', () => {
    it('should return 401 Unauthorized', async () => {
        const response = await request(app).delete('/users/testuser');
        expect(response.status).toBe(401);
    });
    const username = 'testuser';
    const deleteTestUser = async () => {
        await User.destroy({ where: { username: username } })
    };
    deleteTestUser();
});

afterAll(() => {
    sequelize.close();
});