import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { loginUser } from '../api';
import { decryptVault, generateVaultKey } from '../utils/crypto';
import { storeVault, storeVaultKey } from '../utils/storage';
import { VaultItem } from '../utils/types';

interface useLoginProps {
  setStep: Dispatch<SetStateAction<'register' | 'vault' | 'login'>>;
  setVault: Dispatch<SetStateAction<VaultItem[]>>;
  setVaultKey: Dispatch<SetStateAction<string>>;
}

const useLogin = ({ setStep, setVault, setVaultKey }: useLoginProps) => {
  const { mutate: login, isLoading } = useMutation(loginUser, {
    onSuccess: ({ salt, vault }, { hashedPassword, email }) => {
      const vaultKey = generateVaultKey({ email, hashedPassword, salt });
      storeVaultKey(vaultKey);
      setVaultKey(vaultKey);
      const decryptedVault = decryptVault({ vault, vaultKey });

      setVault(decryptedVault);
      storeVault(JSON.stringify(decryptedVault));
      setStep('vault');
    },
  });

  return { login, isLoading };
};

export default useLogin;
