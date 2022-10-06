import { FastifyReply, FastifyRequest } from 'fastify';

import { COOKIE_DOMAIN, IS_PRODUCTION } from '../../constants';
import logger from '../../utils/logger';
import { createVault, findVault } from '../vault/vault.service';
import {
  createUser,
  findUserByEmailAndPassword,
  generateSalt,
} from './user.service';

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

export async function loginHandler(
  request: FastifyRequest<{
    Body: Parameters<typeof findUserByEmailAndPassword>[number];
  }>,
  reply: FastifyReply,
) {
  const body = request.body;

  try {
    const user = await findUserByEmailAndPassword(body);

    if (!user) {
      return reply.status(401).send({
        message: 'Invalid email or password',
      });
    }

    const vault = await findVault(user._id);

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

    return reply
      .code(200)
      .send({ accessToken, vault: vault?.data, salt: vault?.salt });
  } catch (e) {
    logger.error(e, 'error login user');
    return reply.code(500).send(e);
  }
}
