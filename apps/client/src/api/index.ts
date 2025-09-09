import axios from 'axios';

import { API_URL } from '../utils/constants';

const userBase = `${API_URL}/api/users`;
const vaultBase = `${API_URL}/api/vault`;
const loginBase = `${userBase}/login`;

export const registerUser = async (payload: {
  hashedPassword: string;
  email: string;
}) => {
  const response = await axios.post<{ salt: string; vault: string }>(
    userBase,
    payload,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const saveVault = async ({
  encryptedVault,
}: {
  encryptedVault: string;
}) => {
  const response = await axios.put<void>(
    vaultBase,
    { encryptedVault },
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const loginUser = async (payload: {
  hashedPassword: string;
  email: string;
}) => {
  const response = await axios.post<{ salt: string; vault: string }>(
    loginBase,
    payload,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
