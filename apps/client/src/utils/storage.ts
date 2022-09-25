import { VAULT_STORAGE_KEY } from './constants';

export const storeVaultKey = (vaultKey: string) => {
  window.sessionStorage.setItem(VAULT_STORAGE_KEY, vaultKey);
};
