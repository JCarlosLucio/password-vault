import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

import FormWrapper from './FormWrapper';

const RegisterForm = () => {
  return (
    <FormWrapper>
      <Heading>Register</Heading>

      <FormControl mt="4">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" placeholder="Email" />
      </FormControl>

      <FormControl mt="4">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" placeholder="Password" type="password" />
      </FormControl>

      <Button type="submit">Register</Button>
    </FormWrapper>
  );
};

export default RegisterForm;
