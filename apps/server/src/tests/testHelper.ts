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
