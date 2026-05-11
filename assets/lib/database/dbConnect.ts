import mongoose from 'mongoose';

/** * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents creating multiple connections during HMR.
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// 1. Define the shape of our cached object
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// 2. Augment the global object strictly
declare global {
    var mongoose: MongooseCache | undefined;
}

/**
 * Global caching logic
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
    // If we already have a connection, return it immediately
    if (cached?.conn) {
        return cached.conn;
    }

    // If we don't have a promise, create one
    if (!cached?.promise) {
        const opts = {
            bufferCommands: false,
            // In production, you might want to adjust maxPoolSize based on your DB tier
            maxPoolSize: 10,
        };

        // We assign the promise to the cache so multiple simultaneous calls
        // wait for the SAME connection instead of creating new ones
        cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((m) => {
            return m;
        });
    }

    try {
        // Await the promise and store the resulting connection
        cached!.conn = await cached!.promise;
    } catch (e) {
        // IMPORTANT: If connection fails, clear the promise so the next request can try again
        cached!.promise = null;
        console.error('MongoDB Connection Error:', e);
        throw e;
    }

    return cached!.conn;
}

export default dbConnect;
