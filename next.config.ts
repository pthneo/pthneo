import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4189',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: 'benschenk.dev',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'bucket.benschenk.dev',
      },
    ],
  },
};

export default withPayload(nextConfig);
