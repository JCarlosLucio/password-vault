import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

type PasswordInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
} & Omit<InputProps, 'name'>;

const PasswordInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  ...props
}: PasswordInputProps<TFormValues>) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        {...props}
        type={show ? 'text' : 'password'}
        {...register(name, rules)}
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
