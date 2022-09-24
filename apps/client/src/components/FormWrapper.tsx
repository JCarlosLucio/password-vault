import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

const FormWrapper = ({
  children,
  ...props
}: { children: ReactNode } & BoxProps) => {
  return (
    <Box w="100%" maxW="container.sm" boxShadow="xl" p="8" as="form" {...props}>
      {children}
    </Box>
  );
};

export default FormWrapper;
