import { Flex, Heading } from '@chakra-ui/react';

import ShieldIcon from './ShieldIcon';

const Header = () => {
  return (
    <Flex
      justify="center"
      align="center"
      direction={['column', 'row']}
      pt={[10, 32]}
      pb={[1, 20]}
      px="10"
      gap={[1, 5]}
      w="100%"
      zIndex="1"
      as="header"
      data-state="open"
      _open={{
        animationName: 'slideDown',
        animationDuration: '300ms',
        animationTimingFunction: 'ease-in',
      }}
    >
      <ShieldIcon boxSize={[14, 16]} />
      <Heading
        as="h1"
        lineHeight={[1, 1.5]}
        size={['5xl', '7xl']}
        textAlign="center"
        letterSpacing="normal"
        variant="gradient"
      >
        Password Vault
      </Heading>
    </Flex>
  );
};

export default Header;
