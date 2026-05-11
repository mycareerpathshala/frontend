declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_STRAPI_URL: string;
        STRAPI_URL: string;
        STRAPI_API_TOKEN: string;
        NODE_ENV: 'development' | 'production' | 'test';
        MONGODB_URI: string;
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}
