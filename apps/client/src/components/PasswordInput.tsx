import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface PasswordInputProps {
  id: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  registerOptions?: RegisterOptions;
}

const PasswordInput = ({
  id,
  name,
  placeholder = 'Password',
  register,
  registerOptions,
}: PasswordInputProps) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        id={id}
        placeholder={placeholder}
        type={show ? 'text' : 'password'}
        {...register(name, registerOptions)}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
