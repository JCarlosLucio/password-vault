import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import Fastify, { FastifyInstance } from 'fastify';
import { readFileSync } from 'fs';
import path from 'path';

import { CORS_ORIGIN } from '../constants';

const createServer = () => {
  const app: FastifyInstance = Fastify();

  app.register(cors, {
    origin: CORS_ORIGIN,
    credentials: true,
  });

  app.register(jwt, {
    secret: {
      private: readFileSync(
        `${path.join(process.cwd(), 'certs')}/private.key`,
        'utf8',
      ),
      public: readFileSync(
        `${path.join(process.cwd(), 'certs')}/public.key`,
        'utf8',
      ),
    },
    sign: { algorithm: 'RS256' },
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  return app;
};

export default createServer;
