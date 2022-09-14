import cors from '@fastify/cors';
import Fastify, { FastifyInstance } from 'fastify';

import { CORS_ORIGIN } from '../constants';

const createServer = () => {
  const app: FastifyInstance = Fastify();

  app.register(cors, {
    origin: CORS_ORIGIN,
    credentials: true,
  });

  return app;
};

export default createServer;
