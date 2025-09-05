import { type FastifyReply, type FastifyRequest } from 'fastify';

import { COOKIE_DOMAIN, IS_PRODUCTION } from '../../constants';
import logger from '../../utils/logger';
import { createVault, findVault } from '../vault/vault.service';
import {
  createUser,
  findUserByEmailAndPassword,
  generateSalt,
} from './user.service';

export const registerUserHandler = async (
  request: FastifyRequest<{ Body: Parameters<typeof createUser>[number] }>,
  reply: FastifyReply,
) => {
  const body = request.body;

  try {
    const user = await createUser(body);

    const salt = generateSalt();

    const vault = await createVault({ user: user._id, salt });

    const accessToken = await reply.jwtSign({
      _id: user._id,
      email: user.email,
    });

    /**
     * If the cookie domain is in the Public Suffixes List (https://github.com/publicsuffix/list) then cookies won't be set (https://devcenter.heroku.com/articles/cookies-and-herokuapp-com).
     * ex. herokuapp.com, onrender.com, vercel.app.
     * This can be fixed using a custom domain.
     */
    reply.setCookie('token', accessToken, {
      domain: COOKIE_DOMAIN,
      path: '/',
      secure: IS_PRODUCTION,
      httpOnly: true,
      sameSite: IS_PRODUCTION ? 'none' : 'lax',
    });

    return reply.code(201).send({ accessToken, vault: vault.data, salt });
  } catch (e) {
    logger.error(e, 'error creating user');
    return reply.code(500).send(e);
  }
};

export const loginHandler = async (
  request: FastifyRequest<{
    Body: Parameters<typeof findUserByEmailAndPassword>[number];
  }>,
  reply: FastifyReply,
) => {
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
      sameSite: IS_PRODUCTION ? 'none' : 'lax',
    });

    return reply
      .code(200)
      .send({ accessToken, vault: vault?.data, salt: vault?.salt });
  } catch (e) {
    logger.error(e, 'error login user');
    return reply.code(500).send(e);
  }
};
