/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // 'dev-graegrae-private.s3.ap-northeast-2.amazonaws.com',
      // 'dev-graegrae-public.s3.ap-northeast-2.amazonaws.com',
      // 'prod-graegrae-public.s3.ap-northeast-2.amazonaws.com',
      // 'prod-graegrae-private.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  compiler: {
    emotion: true,
  },
  webpack: (config, { isServer }) => {
    // svg 사용을 위한 config
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

module.exports = nextConfig
