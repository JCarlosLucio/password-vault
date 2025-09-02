import {
  IconButton,
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
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

type PasswordInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
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
      <InputRightElement>
        <IconButton
          onClick={handleClick}
          size="sm"
          aria-label={show ? 'Hide password' : 'Show password'}
          icon={show ? <FaRegEyeSlash /> : <FaRegEye />}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
