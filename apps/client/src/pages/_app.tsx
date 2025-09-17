import '../styles/globals.css';

import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import { Provider } from '../components/ui/provider';
import { queryClient } from '../utils/queryClient';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
