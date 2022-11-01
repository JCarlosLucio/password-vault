import { Box, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Vault from '../components/Vault';
import { loadVault, loadVaultKey } from '../utils/storage';
import { VaultItem } from '../utils/types';

const Home: NextPage = () => {
  const [step, setStep] = useState<'login' | 'register' | 'vault'>('register');
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState('');

  useEffect(() => {
    const storedVault = loadVault();
    const storedVaultKey = loadVaultKey();

    if (storedVault) {
      setVault(storedVault);
    }
    if (storedVaultKey) {
      setVaultKey(storedVaultKey);
      setStep('vault');
    }
  }, []);

  return (
    <Box height="100%">
      <Head>
        <title>Password Vault</title>
        <meta
          name="description"
          content="A password vault for all your passwords"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Flex as="main" py="4" direction="column" justify="center" align="center">
        {step === 'register' && (
          <RegisterForm setStep={setStep} setVaultKey={setVaultKey} />
        )}
        {step === 'login' && (
          <LoginForm
            setStep={setStep}
            setVaultKey={setVaultKey}
            setVault={setVault}
          />
        )}
        {step === 'vault' && <Vault vault={vault} vaultKey={vaultKey} />}
      </Flex>
    </Box>
  );
};

export default Home;
