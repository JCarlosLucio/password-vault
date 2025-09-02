import { FastifyReply, FastifyRequest } from 'fastify';

import logger from '../../utils/logger';
import { updateVault } from './vault.service';

export const updateVaultHandler = async (
  request: FastifyRequest<{
    Body: {
      encryptedVault: string;
    };
  }>,
  reply: FastifyReply,
) => {
  try {
    const user = await request.jwtVerify<{ _id: string }>();

    if (!user || !user?._id) {
      throw new Error('authentication error');
    }

    await updateVault({
      data: request.body.encryptedVault,
      userId: user._id,
    });

    return reply.code(200).send('Vault updated');
  } catch (e) {
    logger.error(e, 'error updating vault');
    return reply.code(500).send(e);
  }
};
