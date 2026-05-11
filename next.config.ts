import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            // Production Strapi uploads server (HTTP — update to https if the server gets TLS)
            {
                protocol: 'http',
                hostname: '194.164.150.193',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
    reactCompiler: true,
};

export default nextConfig;
