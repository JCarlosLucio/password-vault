import { Flex, Heading } from '@chakra-ui/react';

import ShieldIcon from './ShieldIcon';

const Header = () => {
  return (
    <Flex
      justify="center"
      align="center"
      direction={['column', 'row']}
      pt={[10, 36]}
      pb={[1, 24]}
      px="10"
      gap={[1, 5]}
      w="100%"
      backdropFilter="auto"
      backdropBlur="2px"
      _dark={{ backdropBlur: '6px' }}
      as="header"
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
