import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FormWrapperProps = { children: ReactNode } & BoxProps;

const FormWrapper = ({ children, ...props }: FormWrapperProps) => {
  return (
    <Box w="100%" maxW="container.lg" p="8" as="form" {...props}>
      {children}
    </Box>
  );
};

export default FormWrapper;
