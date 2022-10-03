import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

import FormWrapper from './FormWrapper';

const LoginForm = () => {
  return (
    <FormWrapper>
      <Heading>Login</Heading>

      <FormControl mt="4">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" placeholder="Email" />
      </FormControl>

      <FormControl mt="4">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" placeholder="Password" type="password" />
      </FormControl>

      <Button type="submit">Login</Button>
    </FormWrapper>
  );
};

export default LoginForm;
