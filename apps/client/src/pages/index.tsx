import { Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import Background from '../components/Background';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import MadeBy from '../components/MadeBy';
import Nav from '../components/Nav';
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
    <Flex
      direction="column"
      justify="flex-start"
      align="center"
      h="100%"
      overflowX="hidden"
    >
      <Head>
        <title>🔒 Password Vault</title>
        <meta
          name="description"
          content="A password vault for all your passwords"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {step === 'vault' ? <Nav /> : <Header />}

      <Flex
        as="main"
        maxW="100%"
        w="100%"
        h="100%"
        direction="column"
        justify="start"
        align="center"
      >
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

      <MadeBy />

      <Background />
    </Flex>
  );
};

export default Home;
