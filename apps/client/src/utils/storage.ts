import { VAULT_KEY_STORAGE_KEY, VAULT_STORAGE_KEY } from './constants';
import { VaultItem } from './types';

export const storeVaultKey = (vaultKey: string) => {
  window.sessionStorage.setItem(VAULT_KEY_STORAGE_KEY, vaultKey);
};

export const storeVault = (vault: string) => {
  window.sessionStorage.setItem(VAULT_STORAGE_KEY, vault);
};

export const loadVaultKey = (): string | null => {
  const storedVaultKey = window.sessionStorage.getItem(VAULT_KEY_STORAGE_KEY);
  return storedVaultKey;
};

export const loadVault = (): VaultItem[] | null => {
  const storedVault = window.sessionStorage.getItem(VAULT_STORAGE_KEY);
  if (storedVault) {
    return JSON.parse(storedVault);
  }
  return null;
};
