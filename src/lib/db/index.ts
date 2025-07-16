import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable in .env");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {

  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI as string, {
      bufferCommands: false,
    });
  }
  
  cached.conn = await cached.promise;
  globalThis.mongoose = cached;
  return cached.conn;
}

export default dbConnect;
