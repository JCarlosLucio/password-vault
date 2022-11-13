import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import { queryClient } from '../utils/queryClient';
import theme from '../utils/theme';

const { ToastContainer } = createStandaloneToast();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
