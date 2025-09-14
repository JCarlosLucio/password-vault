import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { saveVault } from '../api';

const useSaveVault = () => {
  const toast = useToast();

  const { mutate: save, isPending } = useMutation({
    mutationFn: saveVault,
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

  return { save, isPending };
};

export default useSaveVault;
