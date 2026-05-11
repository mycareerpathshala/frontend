import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// cache the connection across HMR in development
const globalForDb = globalThis as unknown as { _db: ReturnType<typeof drizzle> | undefined };

function createDb() {
    const isProd = process.env.NODE_ENV === 'production';
    const client = postgres(process.env.DATABASE_URL!, {
        ssl: isProd ? 'require' : false,
        max: isProd ? 10 : 1,
    });
    return drizzle(client, { schema });
}

export const db = globalForDb._db ?? createDb();

if (process.env.NODE_ENV !== 'production') {
    globalForDb._db = db;
}
