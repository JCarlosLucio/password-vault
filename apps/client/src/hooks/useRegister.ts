import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { registerUser } from '../api';
import { generateVaultKey } from '../utils/crypto';
import { storeVault, storeVaultKey } from '../utils/storage';

interface useRegisterProps {
  setStep: Dispatch<SetStateAction<'register' | 'vault' | 'login'>>;
  setVaultKey: Dispatch<SetStateAction<string>>;
}

const useRegister = ({ setStep, setVaultKey }: useRegisterProps) => {
  const { mutate: register, isLoading } = useMutation(registerUser, {
    onSuccess: ({ salt, vault }, { hashedPassword, email }) => {
      const vaultKey = generateVaultKey({ email, hashedPassword, salt });
      storeVaultKey(vaultKey);
      setVaultKey(vaultKey);

      storeVault(JSON.stringify(vault));

      setStep('vault');
    },
  });

  return { register, isLoading };
};

export default useRegister;
