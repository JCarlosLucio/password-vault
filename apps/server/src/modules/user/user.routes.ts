import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';

import { registerUserHandler } from './user.controller';

const userRoutes = (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (e?: FastifyError) => void,
) => {
  // /api/users
  app.post('/', registerUserHandler);

  done();
};

export default userRoutes;
