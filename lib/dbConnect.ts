import mongoose, { Mongoose } from 'mongoose';

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // This keeps the cache persistent across hot reloads
  var mongoose: MongooseCache;
}

let cached: MongooseCache;

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

cached = global.mongoose;

async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI as string, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
