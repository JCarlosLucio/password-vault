import { useMutation } from '@tanstack/react-query';

import { saveVault } from '../api';

const useSaveVault = () => {
  const { mutate: save, isLoading } = useMutation(saveVault);

  return { save, isLoading };
};

export default useSaveVault;
