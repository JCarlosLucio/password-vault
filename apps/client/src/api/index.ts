import axios from 'axios';

import { API_URL } from '../utils/constants';

const userBase = `${API_URL}/api/users`;

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
