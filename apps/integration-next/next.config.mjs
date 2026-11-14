import { cpSync } from 'node:fs';

// `public/` is the only place Next serves static files from, and the mock has to stay single-sourced.
cpSync(
  new URL('../../packages/components/src/playground/klp-platform-mock.js', import.meta.url),
  new URL('./public/klp-platform-mock.js', import.meta.url),
);

/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ssr',
        permanent: true,
      },
    ];
  },
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
