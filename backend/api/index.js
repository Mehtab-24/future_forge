const app = require('../src/app');
const mongoose = require('mongoose');

// Cache the database connection to reuse across hot invocations
let conn = null;

const connectDB = async () => {
  if (conn) {
    return conn;
  }

  if (mongoose.connection.readyState === 1) {
    conn = mongoose.connection;
    return conn;
  }

  try {
    // Vercel serverless functions have a short execution limit, 
    // so we want to connect quickly and fail fast if there's an issue.
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    conn = mongoose.connection;
    console.log('MongoDB connected (Vercel)');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error (Vercel):', error);
    throw error;
  }
};

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
