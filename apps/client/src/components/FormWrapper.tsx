import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type FormWrapperProps = { children: ReactNode; initialX?: number } & BoxProps;

const FormWrapper = ({
  children,
  maxW = 'container.sm',
  initialX = -100,
  ...props
}: FormWrapperProps) => {
  return (
    <Box
      w="100%"
      maxW={maxW}
      p="8"
      backdropFilter="auto"
      backdropBlur="2px"
      _dark={{ backdropBlur: '6px' }}
      as={motion.form}
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FormWrapper;
