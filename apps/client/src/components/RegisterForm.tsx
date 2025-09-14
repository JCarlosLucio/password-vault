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

import useRegister from '../hooks/useRegister';
import { hashPassword } from '../utils/crypto';
import FormWrapper from './FormWrapper';
import PasswordInput from './PasswordInput';

interface RegisterFormProps {
  setStep: Dispatch<SetStateAction<'register' | 'vault' | 'login'>>;
  setVaultKey: Dispatch<SetStateAction<string>>;
}

const RegisterForm = ({ setStep, setVaultKey }: RegisterFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ email: string; password: string; hashedPassword: string }>();

  const { register: registerUser, isPending } = useRegister({
    setStep,
    setVaultKey,
  });

  const goToLogin = (_e: MouseEvent<HTMLButtonElement>) => setStep('login');

  const onSubmit = (formData: { email: string; password: string }) => {
    const hashedPassword = hashPassword(formData.password);
    registerUser({ email: formData.email, hashedPassword });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} initialX={-100}>
      <Heading data-testid="form-heading">Register</Heading>

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
          data-testid="register-btn"
          isPending={isPending}
          size="lg"
        >
          Register
        </Button>
      </Flex>

      <Flex direction="column" alignItems="start" gap="4" mt="5">
        <Divider mt="6" mb="6" />
        <Text fontSize="md" as="b">
          Already have an account?
        </Text>
        <Button
          variant="outline"
          data-testid="go-to-login-btn"
          onClick={goToLogin}
          size="lg"
        >
          Login
        </Button>
      </Flex>
    </FormWrapper>
  );
};

export default RegisterForm;
