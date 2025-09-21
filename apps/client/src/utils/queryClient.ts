import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { toaster } from '../components/ui/toaster';

const queryErrorHandler = (error: unknown) => {
  let errorMessage = 'error connecting to server';
  if (error instanceof AxiosError) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    errorMessage =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error?.response?.data?.message ??
      JSON.stringify(error).replace(/^Error:\s*/, ''); // remove the initial 'Error: ' that accompanies many errors
  }

  toaster.create({
    title: 'An error occurred',
    description: errorMessage,
    type: 'error',
    duration: 5000,
    closable: true,
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
