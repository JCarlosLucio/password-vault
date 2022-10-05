import aes from 'crypto-js/aes';
import pbkdf2 from 'crypto-js/pbkdf2';
import sha256 from 'crypto-js/sha256';

export const hashPassword = (password: string) => {
  return sha256(password).toString();
};

export const generateVaultKey = ({
  email,
  hashedPassword,
  salt,
}: {
  email: string;
  hashedPassword: string;
  salt: string;
}) => {
  return pbkdf2(`${email}:${hashedPassword}`, salt, {
    keySize: 32,
  }).toString();
};

export const encryptVault = ({
  vault,
  vaultKey,
}: {
  vault: string;
  vaultKey: string;
}) => {
  return aes.encrypt(vault, vaultKey).toString();
};
