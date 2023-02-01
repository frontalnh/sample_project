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
}

module.exports = nextConfig
