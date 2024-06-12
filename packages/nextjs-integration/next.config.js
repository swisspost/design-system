const withLitSSR = require('@lit-labs/nextjs')({
  addDeclarativeShadowDomPolyfill: true,
});

/** @type {import('next').NextConfig} */
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

module.exports = withLitSSR(nextConfig);
