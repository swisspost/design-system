/** @type {import('next').NextConfig} */

// import { postComponentsSSR } from '@swisspost/design-system-components-react/next';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.post.ch',
      },
    ],
  },
};

export default nextConfig;
// export default postComponentsSSR(nextConfig);
