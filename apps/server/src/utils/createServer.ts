import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { readFileSync } from 'fs';
import path from 'path';

import { CORS_ORIGIN } from '../constants';
import userRoutes from '../modules/user/user.routes';
import vaultRoutes from '../modules/vault/vault.routes';
import logger from './logger';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (
      request: FastifyRequest<{
        Body: {
          encryptedVault: string;
        };
      }>,
      reply: FastifyReply,
    ) => Promise<never>;
  }
}

const createServer = () => {
  const app: FastifyInstance = Fastify();

  app.register(helmet);

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

  app.get('/ping', async () => {
    return 'pong';
  });
  app.register(userRoutes, { prefix: 'api/users' });
  app.register(vaultRoutes, { prefix: 'api/vault' });

  return app;
};

export default createServer;
