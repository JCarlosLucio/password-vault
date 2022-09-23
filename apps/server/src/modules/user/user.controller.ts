import { FastifyReply, FastifyRequest } from 'fastify';

import { COOKIE_DOMAIN, IS_PRODUCTION } from '../../constants';
import logger from '../../utils/logger';
import { createVault } from '../vault/vault.service';
import { createUser, generateSalt } from './user.service';

export async function registerUserHandler(
  request: FastifyRequest<{ Body: Parameters<typeof createUser>[number] }>,
  reply: FastifyReply,
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    const salt = generateSalt();

    const vault = await createVault({ user: user._id, salt });

    const accessToken = await reply.jwtSign({
      _id: user._id,
      email: user.email,
    });

    reply.setCookie('token', accessToken, {
      domain: COOKIE_DOMAIN,
      path: '/',
      secure: IS_PRODUCTION,
      httpOnly: true,
      sameSite: false,
    });

    return reply.code(201).send({ accessToken, vault: vault.data, salt });
  } catch (e) {
    logger.error(e, 'error creating user');
    return reply.code(500).send(e);
  }
}
