/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  eslint: {},
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default config;
