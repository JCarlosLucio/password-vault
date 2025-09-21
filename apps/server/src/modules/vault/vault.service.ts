import { type Types } from 'mongoose';

import { VaultModel } from './vault.model';

export const createVault = (input: {
  user: string | Types.ObjectId;
  salt: string;
}) => {
  return VaultModel.create(input);
};

export const updateVault = ({
  userId,
  data,
}: {
  userId: string | Types.ObjectId;
  data: string;
}) => {
  return VaultModel.updateOne({ user: userId }, { data });
};

export const findVault = (userId: string | Types.ObjectId) => {
  return VaultModel.findOne({ user: userId });
};
