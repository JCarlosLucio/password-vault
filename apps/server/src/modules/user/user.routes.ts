import {
  type FastifyError,
  type FastifyInstance,
  type FastifyPluginOptions,
} from 'fastify';

import { loginHandler, registerUserHandler } from './user.controller';

const userRoutes = (
  app: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: (e?: FastifyError) => void,
) => {
  // /api/users
  app.post('/', registerUserHandler);

  // /api/users/login
  app.post('/login', loginHandler);

  done();
};

export default userRoutes;
