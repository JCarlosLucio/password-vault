import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import Fastify, { type FastifyInstance } from 'fastify';
import { readFileSync } from 'fs';

import {
  CORS_ORIGIN,
  IS_TESTING,
  PRIVATE_KEY_PATH,
  PUBLIC_KEY_PATH,
} from '../constants';
import testingRoutes from '../modules/testing/testing.routes';
import userRoutes from '../modules/user/user.routes';
import vaultRoutes from '../modules/vault/vault.routes';
import logger from './logger';

const createServer = () => {
  const app: FastifyInstance = Fastify();

  app.register(helmet);

  app.register(cors, {
    origin: CORS_ORIGIN,
    credentials: true,
  });

  app.register(jwt, {
    secret: {
      private: readFileSync(PRIVATE_KEY_PATH, 'utf8'),
      public: readFileSync(PUBLIC_KEY_PATH, 'utf8'),
    },
    sign: { algorithm: 'RS256' },
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  app.register(cookie, {
    parseOptions: {},
  });

  app.get('/ping', () => {
    return 'pong';
  });
  app.register(userRoutes, { prefix: 'api/users' });
  app.register(vaultRoutes, { prefix: 'api/vault' });

  if (IS_TESTING) {
    app.register(testingRoutes, { prefix: 'api/testing' });
  }

  app.setErrorHandler((error, _request, reply) => {
    logger.error(JSON.stringify(error, null, 2));

    switch (error.name) {
      case 'ValidationError': {
        if (
          error.message.includes('`password`') ||
          error.message.includes('`email`')
        ) {
          const message = error.message.slice(error.message.indexOf('`'));
          return reply.status(400).send({ message });
        }

        reply.status(400).send({ message: error.message });
        break;
      }
      case 'MongoServerError': {
        if (error.code.toString() === '11000') {
          return reply.status(400).send({ message: 'Email already taken' });
        }

        reply.status(400).send({ message: error.message });
        break;
      }

      default: {
        reply.code(500).send(error);
        break;
      }
    }
  });

  return app;
};

export default createServer;
