import { Flex, type FlexProps } from '@chakra-ui/react';
import { motion } from 'motion/react';
import { type ReactNode } from 'react';

type FormWrapperProps = { children: ReactNode; initialX?: number } & FlexProps;

const FormWrapper = ({
  children,
  maxW = 'xl',
  initialX = -100,
  ...props
}: FormWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Flex
        w="100%"
        maxW={maxW}
        direction="column"
        alignContent="space-between"
        p={['8', '0']}
        gap="5"
        as="form"
        {...props}
      >
        {children}
      </Flex>
    </motion.div>
  );
};

export default FormWrapper;
