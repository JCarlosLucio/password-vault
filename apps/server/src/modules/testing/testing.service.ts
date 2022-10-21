import { UserModel } from '../user/user.model';
import { VaultModel } from '../vault/vault.model';

export const resetUsersAndVaults = async () => {
  await UserModel.deleteMany({});
  await VaultModel.deleteMany({});
};
