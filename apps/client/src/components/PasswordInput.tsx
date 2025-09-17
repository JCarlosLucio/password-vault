import {
  IconButton,
  Input,
  InputGroup,
  type InputProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormRegister,
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
    <InputGroup
      endElement={
        <IconButton
          onClick={handleClick}
          size="sm"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          show ? <FaRegEyeSlash /> : <FaRegEye />
        </IconButton>
      }
    >
      <Input
        pr="4.5rem"
        {...props}
        type={show ? 'text' : 'password'}
        {...register(name, rules)}
      />
    </InputGroup>
  );
};

export default PasswordInput;
