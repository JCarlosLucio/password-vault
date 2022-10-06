import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Vault from '../components/Vault';
import styles from '../styles/Home.module.css';
import { loadVault, loadVaultKey } from '../utils/storage';
import { VaultItem } from '../utils/types';

const Home: NextPage = () => {
  const [step, setStep] = useState<'login' | 'register' | 'vault'>('login');
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
    <div className={styles.container}>
      <Head>
        <title>Password Vault</title>
        <meta
          name="description"
          content="A password vault for all your passwords"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {step === 'register' && (
          <RegisterForm setStep={setStep} setVaultKey={setVaultKey} />
        )}
        {step === 'login' && <LoginForm />}
        {step === 'vault' && <Vault vault={vault} vaultKey={vaultKey} />}
      </main>
    </div>
  );
};

export default Home;
