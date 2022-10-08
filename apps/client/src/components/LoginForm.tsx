import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import { loginUser } from '../api';
import { generateVaultKey, hashPassword } from '../utils/crypto';
import { storeVault, storeVaultKey } from '../utils/storage';
import FormWrapper from './FormWrapper';

const LoginForm = ({
  setStep,
  setVaultKey,
}: {
  setStep: Dispatch<SetStateAction<'register' | 'vault' | 'login'>>;
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
      // TODO: decrypt vault
      storeVault('');
      setStep('vault');
    },
  });
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
        <Input
          id="password"
          placeholder="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <Button type="submit" isLoading={isSubmitting}>
        Login
      </Button>
    </FormWrapper>
  );
};

export default LoginForm;
