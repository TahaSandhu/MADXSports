import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Cache the connection across hot-reloads / serverless invocations,
// otherwise every API route call would open a new connection.
declare global {
    // eslint-disable-next-line no-var
    var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongooseCache || { conn: null, promise: null };
global._mongooseCache = cached;

async function connectDataBase(): Promise<typeof mongoose> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(`${MONGODB_URI}/${DATABASE_NAME}`)
            .then((connectionInstance) => {
                console.log(
                    `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
                );
                return connectionInstance;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error("MONGO DB connection error", error);
        throw error;
    }

    return cached.conn;
}

export default connectDataBase;
