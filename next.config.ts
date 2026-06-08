import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '194.164.150.193',
                port: '',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: '*.sslip.io',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
    reactCompiler: true,
};

export default nextConfig;
