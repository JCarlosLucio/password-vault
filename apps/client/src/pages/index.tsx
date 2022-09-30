import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Vault from '../components/Vault';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [step, setStep] = useState<'login' | 'register' | 'vault'>('register');

  const [vaultKey, setVaultKey] = useState('');

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
        {step === 'vault' && <Vault />}
      </main>
    </div>
  );
};

export default Home;
