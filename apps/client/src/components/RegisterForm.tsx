import { Field, Flex, Heading, Input, Separator, Text } from '@chakra-ui/react';
import { type Dispatch, type MouseEvent, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import useRegister from '../hooks/useRegister';
import { hashPassword } from '../utils/crypto';
import FormWrapper from './FormWrapper';
import { Button } from './ui/button';
import { PasswordInput } from './ui/password-input';

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
      <Heading
        data-testid="form-heading"
        size={['3xl', '4xl']}
        letterSpacing="normal"
      >
        Register
      </Heading>

      <Field.Root invalid={!!errors.email}>
        <Field.Label htmlFor="email">Email</Field.Label>
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
        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.password}>
        <Field.Label htmlFor="password">Password</Field.Label>
        <PasswordInput
          id="password"
          placeholder="Password"
          data-testid="password-input"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
        />
        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
      </Field.Root>

      <Flex direction="column">
        <Button
          type="submit"
          variant="gradient"
          data-testid="register-btn"
          loading={isPending}
          size="xl"
        >
          Register
        </Button>
      </Flex>

      <Flex direction="column" alignItems="start" gap="5">
        <Separator mt="6" mb="6" />
        <Text fontSize="md" as="b">
          Already have an account?
        </Text>
        <Button
          variant="outline"
          data-testid="go-to-login-btn"
          onClick={goToLogin}
          size="xl"
        >
          Login
        </Button>
      </Flex>
    </FormWrapper>
  );
};

export default RegisterForm;
