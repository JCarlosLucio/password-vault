import supertest from 'supertest';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest';

import { UserModel } from '../modules/user/user.model';
import createServer from '../utils/createServer';
import { connectToDb, disconnectFromDb } from '../utils/db';
import { initialUser, newUser } from './testHelper';

const app = createServer();

beforeAll(async () => {
  await app.ready();
  await connectToDb();
});

describe('Users', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
    await UserModel.create(initialUser);
  });

  describe('registering a user', () => {
    test('should pong', async () => {
      await supertest(app.server).get('/ping').expect(200);
    });

    test('should succeed with status 201', async () => {
      await supertest(app.server)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    });

    test('should return accessToken, vault, and salt after register', async () => {
      const response = await supertest(app.server)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const props = Object.keys(response.body);

      expect(props).toContain('accessToken');
      expect(props).toContain('vault');
      expect(props).toContain('salt');
    });

    test('should set cookie with token', async () => {
      const response = await supertest(app.server)
        .post('/api/users')
        .send(newUser)
        .expect('set-cookie', /token=(.+?); Domain=(.+?); Path=\/; HttpOnly/)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const { accessToken } = response.body;
      const tokenCookie = response.headers['set-cookie'][0].split('; ')[0];

      expect(tokenCookie).toBe(`token=${accessToken}`);
    });

    test('should fail with  400 if email already taken', async () => {
      const response = await supertest(app.server)
        .post('/api/users')
        .send(initialUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const message = response.body.message;

      expect(message).toBe('Email already taken');
    });
  });
});

afterAll(async () => {
  await app.close();
  await disconnectFromDb();
});
