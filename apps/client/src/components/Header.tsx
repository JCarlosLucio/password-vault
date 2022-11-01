import { Flex, Heading, Icon } from '@chakra-ui/react';
import { RiShieldKeyholeFill } from 'react-icons/ri';

const Header = () => {
  return (
    <Flex
      as="header"
      justify="center"
      align="center"
      direction={['column', 'row']}
      mt={[10, 40]}
      mb={[1, 20]}
      mx="10"
      gap={[1, 5]}
    >
      <Icon as={RiShieldKeyholeFill} boxSize={[14, 16]} />
      <Heading as="h1" size={['2xl', '3xl']} textAlign="center">
        Password Vault
      </Heading>
    </Flex>
  );
};

export default Header;
