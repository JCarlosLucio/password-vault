import { Icon, IconProps } from '@chakra-ui/react';
import { RiShieldKeyholeFill } from 'react-icons/ri';

const ShieldIcon = ({ boxSize = [10], ...props }: IconProps) => {
  return (
    <Icon
      as={RiShieldKeyholeFill}
      boxSize={boxSize}
      color="orange.300"
      _dark={{ color: 'yellow.400' }}
      {...props}
    />
  );
};

export default ShieldIcon;
