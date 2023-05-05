import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_CONNECTION;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_CONNECTION environment variable inside .env.local');
}

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cachedConnection) {
    return cachedConnection;
  }

  const connection = await mongoose.connect(MONGODB_URI as string); //we can safely assume that MONGODB_URI is a string because we check in the if statement here above

  cachedConnection = connection;

  return connection;
}
