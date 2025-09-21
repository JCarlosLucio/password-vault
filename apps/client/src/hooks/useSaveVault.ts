import { useMutation } from '@tanstack/react-query';

import { saveVault } from '../api';
import { toaster } from '../components/ui/toaster';

const useSaveVault = () => {
  const { mutate: save, isPending } = useMutation({
    mutationFn: saveVault,
    onSuccess: () => {
      toaster.create({
        title: 'Vault saved!',
        type: 'success',
        duration: 3000,
        closable: true,
      });
    },
  });

  return { save, isPending };
};

export default useSaveVault;
