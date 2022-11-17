import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import theme from './theme';

export const { toast } = createStandaloneToast({ theme });

const queryErrorHandler = (error: unknown) => {
  let errorMessage = 'error connecting to server';
  if (error instanceof AxiosError) {
    errorMessage =
      error?.response?.data?.message ||
      // remove the initial 'Error: ' that accompanies many errors
      error?.toString().replace(/^Error:\s*/, '');
  }

  toast({
    id: 'error',
    title: 'An error occurred',
    description: errorMessage,
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
