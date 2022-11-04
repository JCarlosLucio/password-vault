import { Flex, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import ShieldIcon from './ShieldIcon';

const Header = () => {
  return (
    <Flex
      justify="center"
      align="center"
      direction={['column', 'row']}
      mt={[10, 40]}
      mb={[1, 20]}
      mx="10"
      gap={[1, 5]}
      as={motion.header}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ShieldIcon boxSize={[14, 16]} />
      <Heading
        as="h1"
        size={['2xl', '3xl']}
        textAlign="center"
        fontSize="6xl"
        variant="gradient"
      >
        Password Vault
      </Heading>
    </Flex>
  );
};

export default Header;
