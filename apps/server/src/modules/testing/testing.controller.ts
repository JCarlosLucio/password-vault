import { FastifyReply, FastifyRequest } from 'fastify';

import logger from '../../utils/logger';
import { resetUsersAndVaults } from './testing.service';

export const resetHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await resetUsersAndVaults();

    // replay with code 204 makes playwright abort the post request
    return reply.code(200).send('Users and Vaults reset');
  } catch (e) {
    logger.error(e, 'error reseting users and vaults');
    return reply.code(500).send(e);
  }
};
