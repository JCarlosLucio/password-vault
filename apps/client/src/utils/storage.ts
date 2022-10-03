import { VAULT_KEY_STORAGE_KEY, VAULT_STORAGE_KEY } from './constants';

export const storeVaultKey = (vaultKey: string) => {
  window.sessionStorage.setItem(VAULT_KEY_STORAGE_KEY, vaultKey);
};

export const storeVault = (vault: string) => {
  window.sessionStorage.setItem(VAULT_STORAGE_KEY, vault);
};
