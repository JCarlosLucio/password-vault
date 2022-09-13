import Fastify, { FastifyInstance } from 'fastify';

const createServer = () => {
  const app: FastifyInstance = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  });

  return app;
};

export default createServer;
