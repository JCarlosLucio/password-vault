import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import { loginUser } from '../api';
import { decryptVault, generateVaultKey, hashPassword } from '../utils/crypto';
import { storeVault, storeVaultKey } from '../utils/storage';
import { VaultItem } from '../utils/types';
import FormWrapper from './FormWrapper';
import PasswordInput from './PasswordInput';

const LoginForm = ({
  setStep,
  setVault,
  setVaultKey,
}: {
  setStep: Dispatch<SetStateAction<'register' | 'vault' | 'login'>>;
  setVault: Dispatch<SetStateAction<VaultItem[]>>;
  setVaultKey: Dispatch<SetStateAction<string>>;
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string; hashedPassword: string }>();

  const mutation = useMutation(loginUser, {
    onSuccess: ({ salt, vault }) => {
      const hashedPassword = getValues('hashedPassword');
      const email = getValues('email');
      const vaultKey = generateVaultKey({ email, hashedPassword, salt });
      storeVaultKey(vaultKey);
      setVaultKey(vaultKey);
      const decryptedVault = decryptVault({ vault, vaultKey });

      setVault(decryptedVault);
      storeVault(JSON.stringify(decryptedVault));
      setStep('vault');
    },
  });

  const goToRegister = (_e: MouseEvent<HTMLButtonElement>) =>
    setStep('register');

  return (
    <FormWrapper
      onSubmit={handleSubmit(() => {
        const email = getValues('email');
        const password = getValues('password');
        const hashedPassword = hashPassword(password);

        setValue('hashedPassword', hashedPassword);
        mutation.mutate({
          email,
          hashedPassword,
        });
      })}
    >
      <Heading>Login</Heading>

      <FormControl mt="4">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="Email"
          data-testid="email-input"
          {...register('email', {
            required: 'Email is required',
            minLength: {
              value: 4,
              message: 'Email must be at least 4 characters long',
            },
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt="4">
        <FormLabel htmlFor="password">Password</FormLabel>
        <PasswordInput
          id="password"
          placeholder="Password"
          name="password"
          data-testid="password-input"
          register={register}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          }}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <Flex direction="column" mt="4">
        <Button type="submit" data-testid="login-btn" isLoading={isSubmitting}>
          Login
        </Button>
      </Flex>

      <Flex direction="column" alignItems="start" gap="4" mt="5">
        <Divider mt="6" mb="6" />
        <Text fontSize="md" as="b">
          Don&apos;t have an account?
        </Text>
        <Button variant="outline" onClick={goToRegister}>
          Register
        </Button>
      </Flex>
    </FormWrapper>
  );
};

export default LoginForm;
