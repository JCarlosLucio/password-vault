import { createSystem, defaultConfig, defineRecipe } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: {
          value:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif',
        },
      },
      colors: {
        black: { value: '#000' },
      },
      lineHeights: {
        normal: { value: '1.5' },
      },
    },
    keyframes: {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      slideUp: {
        from: { transform: 'translateY(100%)' },
        to: { transform: 'translateY(0%)' },
      },
      slideDown: {
        from: { transform: 'translateY(-100%)' },
        to: { transform: 'translateY(0%)' },
      },
      slideIn: {
        from: { transform: 'translateX(-100%)' },
        to: { transform: 'translateX(0%)' },
      },
      slideOut: {
        from: { transform: 'translateX(0%)' },
        to: { transform: 'translateX(100%)' },
      },
    },
    recipes: {
      heading: defineRecipe({
        variants: {
          variant: {
            gradient: {
              fontWeight: 'extrabold',
              bgClip: 'text',
              bgGradient: 'to-r',
              gradientFrom: 'orange.300',
              gradientTo: 'red.500',
              _dark: {
                gradientFrom: 'yellow.400',
                gradientTo: 'orange.500',
              },
            },
          },
        },
      }),
      button: defineRecipe({
        variants: {
          variant: {
            gradient: {
              transition: '500ms',
              color: 'black',
              bgSize: '200% 100%',
              bgGradient: 'to-r',
              gradientFrom: 'orange.400',
              gradientVia: 'red.500',
              gradientTo: 'orange.300',
              _dark: {
                gradientFrom: 'yellow.400',
                gradientVia: 'orange.500',
                gradientTo: 'yellow.400',
              },
              _hover: {
                backgroundPosition: 'right center',
                _disabled: {
                  backgroundPosition: 'right center',
                  bgSize: '200% 100%',
                  gradientFrom: 'orange.400',
                  gradientVia: 'red.500',
                  gradientTo: 'orange.300',
                  _dark: {
                    gradientFrom: 'yellow.400',
                    gradientVia: 'orange.500',
                    gradientTo: 'yellow.400',
                  },
                },
              },
            },
          },
        },
      }),
    },
  },
});
