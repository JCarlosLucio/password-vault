import { VaultModel } from './vault.model';

export function createVault(input: { user: string; salt: string }) {
  return VaultModel.create(input);
}

export const updateVault = ({
  userId,
  data,
}: {
  userId: string;
  data: string;
}) => {
  return VaultModel.updateOne({ user: userId }, { data });
};

export const findVault = (userId: string) => {
  return VaultModel.findOne({ user: userId });
};
