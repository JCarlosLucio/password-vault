import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: 'body',
        color: mode('black', 'whiteAlpha.900')(props),
        bg: mode('gray.100', 'black')(props),
        lineHeight: 'base',
      },
    }),
  },
  components: {
    Heading: {
      variants: {
        gradient: (props: StyleFunctionProps) => ({
          bgGradient: mode(
            'linear(to-r, orange.300, red.500)',
            'linear(to-r, yellow.400, orange.500)',
          )(props),
          bgClip: 'text',
          fontWeight: 'extrabold',
        }),
      },
    },
    Button: {
      variants: {
        gradient: (props: StyleFunctionProps) => ({
          bgGradient: mode(
            'linear(to-r, orange.400, red.500, orange.300)',
            'linear(to-r, yellow.400, orange.500, yellow.400)',
          )(props),
          color: 'black',
          transition: '500ms',
          bgSize: '200% 100%',
          _hover: {
            backgroundPosition: 'right center',
          },
        }),
      },
    },
  },
  config,
});

export default theme;
