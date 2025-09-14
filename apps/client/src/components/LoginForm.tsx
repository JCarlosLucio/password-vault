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
import { type Dispatch, type MouseEvent, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import useLogin from '../hooks/useLogin';
import { hashPassword } from '../utils/crypto';
import { type VaultItem } from '../utils/types';
import FormWrapper from './FormWrapper';
import PasswordInput from './PasswordInput';

interface LoginFormProps {
  setStep: Dispatch<SetStateAction<'register' | 'vault' | 'login'>>;
  setVault: Dispatch<SetStateAction<VaultItem[]>>;
  setVaultKey: Dispatch<SetStateAction<string>>;
}

const LoginForm = ({ setStep, setVault, setVaultKey }: LoginFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ email: string; password: string; hashedPassword: string }>();

  const { login, isPending } = useLogin({ setStep, setVault, setVaultKey });

  const goToRegister = (_e: MouseEvent<HTMLButtonElement>) =>
    setStep('register');

  const onSubmit = (formData: { email: string; password: string }) => {
    const hashedPassword = hashPassword(formData.password);
    login({ email: formData.email, hashedPassword });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} initialX={100}>
      <Heading data-testid="form-heading">Login</Heading>

      <FormControl mt="4" isInvalid={!!errors.email}>
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
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl mt="4" isInvalid={!!errors.password}>
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
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <Flex direction="column" mt="4">
        <Button
          type="submit"
          variant="gradient"
          data-testid="login-btn"
          isLoading={isPending}
          size="lg"
        >
          Login
        </Button>
      </Flex>

      <Flex direction="column" alignItems="start" gap="4" mt="5">
        <Divider mt="6" mb="6" />
        <Text fontSize="md" as="b">
          Don&apos;t have an account?
        </Text>
        <Button
          variant="outline"
          data-testid="go-to-register-btn"
          onClick={goToRegister}
          size="lg"
        >
          Register
        </Button>
      </Flex>
    </FormWrapper>
  );
};

export default LoginForm;
