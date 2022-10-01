import { FastifyReply, FastifyRequest } from 'fastify';
import _ from 'lodash';

import logger from '../../utils/logger';
import { updateVault } from './vault.service';

export async function updateVaultHandler(
  request: FastifyRequest<{
    Body: {
      encryptedVault: string;
    };
  }>,
  reply: FastifyReply,
) {
  const userId = _.get(request, 'user._id');

  try {
    await updateVault({
      data: request.body.encryptedVault,
      userId,
    });

    return reply.code(200).send('Vault updated');
  } catch (e) {
    logger.error(e, 'error updating vault');
    return reply.code(500).send(e);
  }
}
