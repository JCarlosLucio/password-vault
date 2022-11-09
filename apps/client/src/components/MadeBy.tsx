import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import { FaGithubAlt } from 'react-icons/fa';
import { RiHeartsFill } from 'react-icons/ri';

const MadeBy = () => {
  return (
    <Flex
      as="footer"
      gap="1"
      align="center"
      justify="center"
      w="100%"
      backdropFilter="auto"
      backdropBlur="2px"
      _dark={{ backdropBlur: '6px' }}
    >
      <Text fontSize="xs" py="4">
        Made with
      </Text>
      <Icon as={RiHeartsFill} color="yellow.500" />
      <Text fontSize="xs" py="4">
        by Lucio
      </Text>
      <Link href="https://github.com/JCarlosLucio/password-vault">
        <Icon as={FaGithubAlt} />
      </Link>
    </Flex>
  );
};

export default MadeBy;
