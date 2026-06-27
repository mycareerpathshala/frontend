import type { NextConfig } from 'next';

// Public host of the R2 bucket (hostname only), e.g. media.mycareerpathshala.com
const r2Host = process.env.R2_PUBLIC_HOST;

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cms.mycareerpathshala.com',
                port: '',
                pathname: '/uploads/**',
            },
            ...(r2Host
                ? [
                      {
                          protocol: 'https' as const,
                          hostname: r2Host,
                          port: '',
                          pathname: '/**',
                      },
                  ]
                : []),
        ],
    },
    reactCompiler: true,
};

export default nextConfig;
