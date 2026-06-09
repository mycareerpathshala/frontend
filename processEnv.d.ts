declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_STRAPI_URL: string;
        STRAPI_URL: string;
        STRAPI_API_TOKEN: string;
        NODE_ENV: 'development' | 'production' | 'test';
        MONGODB_URI: string;
        DATABASE_URL: string;
        JWT_SECRET: string;
        // Email (Resend)
        RESEND_API_KEY: string;
        EMAIL_FROM_AUTH?: string;
        EMAIL_FROM_ADMISSION?: string;
        EMAIL_DEV_OVERRIDE?: string;
        // App URLs
        NEXT_PUBLIC_APP_URL?: string;
        NEXT_PUBLIC_SITE_URL?: string;
    }
}
