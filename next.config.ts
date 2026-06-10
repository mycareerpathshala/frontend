import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cms.mycareerpathshala.com',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
    reactCompiler: true,
};

export default nextConfig;
