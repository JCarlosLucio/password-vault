import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';

import { updateVaultHandler } from './vault.controller';

const vaultRoutes = (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (e?: FastifyError) => void,
) => {
  // PUT /api/vault
  app.put('/', updateVaultHandler);

  done();
};

export default vaultRoutes;
