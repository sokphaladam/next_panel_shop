/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
  },
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  output: 'standalone',
};

export default nextConfig;
