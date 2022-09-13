import Fastify, { FastifyInstance } from 'fastify';

const createServer = () => {
  const app: FastifyInstance = Fastify();

  return app;
};

export default createServer;
