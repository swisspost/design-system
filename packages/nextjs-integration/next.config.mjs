/** @type {import('next').NextConfig} */

import { postSSR } from '@swisspost/design-system-components-react/next';

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

export default postSSR(nextConfig);
