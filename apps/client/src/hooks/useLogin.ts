import { useMutation } from '@tanstack/react-query';
import { type Dispatch, type SetStateAction } from 'react';

import { loginUser } from '../api';
import { toaster } from '../components/ui/toaster';
import { decryptVault, generateVaultKey } from '../utils/crypto';
import { storeVault, storeVaultKey } from '../utils/storage';
import { type VaultItem } from '../utils/types';

interface useLoginProps {
  setStep: Dispatch<SetStateAction<'register' | 'vault' | 'login'>>;
  setVault: Dispatch<SetStateAction<VaultItem[]>>;
  setVaultKey: Dispatch<SetStateAction<string>>;
}

const useLogin = ({ setStep, setVault, setVaultKey }: useLoginProps) => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ salt, vault }, { hashedPassword, email }) => {
      const vaultKey = generateVaultKey({ email, hashedPassword, salt });
      storeVaultKey(vaultKey);
      setVaultKey(vaultKey);
      const decryptedVault = decryptVault({ vault, vaultKey });

      setVault(decryptedVault);
      storeVault(JSON.stringify(decryptedVault));
      setStep('vault');

      toaster.create({
        title: 'Welcome back!',
        type: 'success',
        duration: 3000,
        closable: true,
      });
    },
  });

  return { login, isPending };
};

export default useLogin;
