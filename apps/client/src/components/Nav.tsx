import { Flex, Heading } from '@chakra-ui/react';

import ShieldIcon from './ShieldIcon';
import { ColorModeButton } from './ui/color-mode';

const Nav = () => {
  return (
    <Flex
      as="nav"
      w="100%"
      justify="center"
      py="3"
      px="5"
      position="fixed"
      zIndex="10"
      backdropFilter="blur(2px)"
      _dark={{ backdropFilter: 'blur(8px)' }}
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
        <ColorModeButton />
      </Flex>
    </Flex>
  );
};

export default Nav;
