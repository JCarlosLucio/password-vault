import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { readFileSync } from 'fs';
import path from 'path';

import { CORS_ORIGIN } from '../constants';
import logger from './logger';

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

  app.register(cookie, {
    parseOptions: {},
  });

  app.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = await request.jwtVerify<{
          _id: string;
        }>();

        request.user = user;
      } catch (e) {
        logger.error(e, 'authentication error');
        return reply.send(e);
      }
    },
  );

  return app;
};

export default createServer;
