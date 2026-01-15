const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = require('../src/app');

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }
};

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  // Make sure to add this so the function doesn't timeout waiting for DB connection to close
  context.callbackWaitsForEmptyEventLoop = false;
  
  await connectDB();
  
  return handler(event, context);
};
