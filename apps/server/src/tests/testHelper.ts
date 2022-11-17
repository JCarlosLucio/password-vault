import { UserModel } from '../modules/user/user.model';
import { generateSalt } from '../modules/user/user.service';
import { VaultModel } from '../modules/vault/vault.model';

export const USERS_URL = '/api/users';

export const LOGIN_URL = `${USERS_URL}/login`;

export const newUser = {
  email: 'new@test.com',
  hashedPassword: 'hashedPassword',
};

export const initialUser = {
  email: 'test@test.com',
  password: '123456',
  hashedPassword: '123456',
};

export const deleteAllUsers = async () => {
  await UserModel.deleteMany({});
};

export const createInitialUser = async () => {
  const user = await UserModel.create(initialUser);
  const salt = generateSalt();
  await VaultModel.create({ user: user._id, salt });
};
