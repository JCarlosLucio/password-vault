import { useMutation } from '@tanstack/react-query';
import { type Dispatch, type SetStateAction } from 'react';

import { registerUser } from '../api';
import { toaster } from '../components/ui/toaster';
import { generateVaultKey } from '../utils/crypto';
import { storeVault, storeVaultKey } from '../utils/storage';

interface useRegisterProps {
  setStep: Dispatch<SetStateAction<'register' | 'vault' | 'login'>>;
  setVaultKey: Dispatch<SetStateAction<string>>;
}

const useRegister = ({ setStep, setVaultKey }: useRegisterProps) => {
  const { mutate: register, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: ({ salt, vault }, { hashedPassword, email }) => {
      const vaultKey = generateVaultKey({ email, hashedPassword, salt });
      storeVaultKey(vaultKey);
      setVaultKey(vaultKey);

      storeVault(JSON.stringify(vault));
      setStep('vault');
      toaster.create({
        title: 'Welcome!',
        type: 'success',
        duration: 3000,
        closable: true,
      });
    },
  });

  return { register, isPending };
};

export default useRegister;
