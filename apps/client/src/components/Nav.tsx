import { Flex, Heading } from '@chakra-ui/react';

import ColorModeToggle from './ColorModeToggle';
import ShieldIcon from './ShieldIcon';

const Nav = () => {
  return (
    <Flex
      as="nav"
      w="100%"
      justify="center"
      backdropFilter="auto"
      backdropBlur="2px"
      _dark={{ backdropBlur: '6px' }}
      py="3"
      px="5"
      position="fixed"
      zIndex="1"
    >
      <Flex w={['100%', '55%']} justify="space-between">
        <Flex gap={['2', '4']} align="center">
          <ShieldIcon boxSize={[7, 9]} />
          <Heading
            as="h1"
            size={['md', 'lg']}
            textAlign="center"
            variant="gradient"
          >
            Password Vault
          </Heading>
        </Flex>
        <ColorModeToggle />
      </Flex>
    </Flex>
  );
};

export default Nav;
