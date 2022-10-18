import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';

import { UserModel } from '../modules/user/user.model';
import createServer from '../utils/createServer';
import { connectToDb, disconnectFromDb } from '../utils/db';

const app = createServer();

beforeAll(async () => {
  await app.ready();
  await connectToDb();
});

describe('Users', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  describe('registering a user', () => {
    test('should pong', async () => {
      await supertest(app.server).get('/ping').expect(200);
    });

    test('should succed with status 201', async () => {
      const newUser = {
        email: 'test@test.com',
        hashedPassword: 'hashedPassword',
      };

      await supertest(app.server)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    });
  });
});

afterAll(async () => {
  await app.close();
  await disconnectFromDb();
});
