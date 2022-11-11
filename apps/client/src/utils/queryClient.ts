import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';

const { toast } = createStandaloneToast();

const queryErrorHandler = (error: unknown) => {
  let errorMessage = 'error connecting to server';
  if (error instanceof Error) {
    errorMessage =
      error?.message ||
      // remove the initial 'Error: ' that accompanies many errors
      error?.toString().replace(/^Error:\s*/, '');
  }

  toast({
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
