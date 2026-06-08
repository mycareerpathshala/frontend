import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './assets/lib/database/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    tablesFilter: ['!admins'],  // admins table is managed by the admin app only
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        ssl: false,
    },
});
