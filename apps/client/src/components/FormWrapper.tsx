import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FormWrapperProps = { children: ReactNode } & BoxProps;

const FormWrapper = ({
  children,
  maxW = 'container.sm',
  ...props
}: FormWrapperProps) => {
  return (
    <Box w="100%" maxW={maxW} p="8" as="form" {...props}>
      {children}
    </Box>
  );
};

export default FormWrapper;
