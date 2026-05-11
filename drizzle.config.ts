import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './assets/lib/database/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    tablesFilter: ['!admins'],  // admins table is managed by the admin app only
    dbCredentials: {
        host: 'localhost',
        port: 5432,
        database: 'mcpapp',
        user: 'mcpadmin',
        password: 'mcp@2026',
        ssl: false,
    },
});
