/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default config;
