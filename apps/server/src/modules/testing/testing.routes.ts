import {
  type FastifyError,
  type FastifyInstance,
  type FastifyPluginOptions,
} from 'fastify';

import { resetHandler } from './testing.controller';

const testingRoutes = (
  app: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: (e?: FastifyError) => void,
) => {
  // /api/testing/reset
  app.post('/reset', resetHandler);

  done();
};

export default testingRoutes;
