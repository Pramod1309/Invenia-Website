// mongo.js
import mongoose from 'mongoose';

// Connection configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Invenia:Invenia%402303@invenia.vbwsmgm.mongodb.net/Invenia?retryWrites=true&w=majority';
const MONGODB_DB = process.env.MONGODB_DB || 'Invenia';

// Connection options
const options = {
  dbName: MONGODB_DB,
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000, // 45 seconds
  connectTimeoutMS: 30000, // 30 seconds
  maxPoolSize: 10, // Maximum number of connections in the connection pool
  retryWrites: true,
  w: 'majority'
};

// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`MongoDB: ${collectionName}.${method}`, JSON.stringify(query), doc);
  });
}

// Connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

// Cache the connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    console.log('Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      console.log('Creating new database connection...');
      cached.promise = mongoose.connect(MONGODB_URI, options);
      // Wait for the connection to be established
      await cached.promise;
      console.log('MongoDB connection established');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', {
        error: error.message,
        code: error.code,
        name: error.name,
        stack: error.stack
      });
      // Reset the promise to allow retries
      cached.promise = null;
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error('Error in database connection:', error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;