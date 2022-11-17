import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { saveVault } from '../api';

const useSaveVault = () => {
  const toast = useToast();

  const { mutate: save, isLoading } = useMutation(saveVault, {
    onSuccess: () => {
      toast({
        id: 'vault-saved',
        title: 'Vault saved!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return { save, isLoading };
};

export default useSaveVault;
