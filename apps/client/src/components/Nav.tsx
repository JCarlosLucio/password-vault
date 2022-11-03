import { Flex } from '@chakra-ui/react';

import ColorModeToggle from './ColorModeToggle';
import ShieldIcon from './ShieldIcon';

const Nav = () => {
  return (
    <Flex as="nav" pt="5" w={['100%', '60%']} px="5" justify="space-between">
      <ShieldIcon />
      <ColorModeToggle />
    </Flex>
  );
};

export default Nav;
