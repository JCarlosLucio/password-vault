import { IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useColorMode } from './ui/color-mode';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      size="md"
      aria-label={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
      variant="ghost"
      fontSize="lg"
    >
      {colorMode === 'light' ? <FaMoon /> : <FaSun />}
    </IconButton>
  );
};

export default ColorModeToggle;
