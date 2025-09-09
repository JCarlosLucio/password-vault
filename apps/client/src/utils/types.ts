export interface VaultItem {
  website: string;
  username: string;
  password: string;
}

export interface VaultData {
  vault: VaultItem[];
}

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

function isVaultItem(obj: unknown): obj is VaultItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'website' in obj &&
    'username' in obj &&
    'password' in obj &&
    isString(obj.website) &&
    isString(obj.username) &&
    isString(obj.password)
  );
}

function parseVaultItem(obj: unknown): VaultItem {
  if (!isVaultItem(obj)) {
    throw new Error('Incorrect or missing vault item');
  }
  return obj;
}

function isVaultItemArray(obj: unknown): obj is VaultItem[] {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every(parseVaultItem)
  );
}

export function parseVaultItemArray(obj: unknown): VaultItem[] {
  if (!isVaultItemArray(obj)) {
    throw new Error('Incorrect or missing vault items');
  }
  return obj;
}

function isVaultData(obj: unknown): obj is VaultData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'vault' in obj &&
    Array.isArray(obj.vault) &&
    obj.vault.every(parseVaultItem)
  );
}

export function parseVaultData(obj: unknown): VaultData {
  if (!isVaultData(obj)) {
    throw new Error('Incorrect or missing vault');
  }
  return obj;
}
