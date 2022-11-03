import { IconButton, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      size="md"
      aria-label={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      variant="ghost"
    />
  );
};

export default ColorModeToggle;
