import * as argon2 from 'argon2';
import crypto from 'crypto';

import { UserModel } from './user.model';

export const generateSalt = () => {
  return crypto.randomBytes(64).toString('hex');
};

export const createUser = (input: {
  hashedPassword: string;
  email: string;
}) => {
  return UserModel.create({
    email: input.email,
    password: input.hashedPassword,
  });
};

export const findUserByEmailAndPassword = async ({
  email,
  hashedPassword,
}: {
  email: string;
  hashedPassword: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (user) {
    const isVerified = await argon2.verify(user.password, hashedPassword);

    if (isVerified) {
      return user;
    }
  }

  return null;
};
