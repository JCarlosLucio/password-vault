import { Flex, type FlexProps } from '@chakra-ui/react';
import { type ReactNode } from 'react';

type FormWrapperProps = { children: ReactNode; initialX?: number } & FlexProps;

const FormWrapper = ({ children, maxW = 'xl', ...props }: FormWrapperProps) => {
  return (
    <Flex
      w="100%"
      h="100%"
      maxW={maxW}
      direction="column"
      alignContent="space-between"
      p={['8', '0']}
      gap="5"
      as="form"
      data-state="open"
      _open={{
        animationName: 'fadeIn, slideUp',
        animationDuration: '300ms',
        animationTimingFunction: 'ease-in',
      }}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default FormWrapper;
