import Mongoose from "mongoose";
import dbUriBuilder from "./dbUriBuilder";

const MONGO_INITDB_URI = process.env.MONGO_INITDB_URI
  ? process.env.MONGO_INITDB_URI
  : dbUriBuilder();

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = Mongoose.connect(MONGO_INITDB_URI, opts).then(
      (mongoose) => {
        return mongoose;
      }
    );
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
