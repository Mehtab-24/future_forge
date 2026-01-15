const logger = require('../utils/logger');
const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) throw new Error('MONGODB_URI is not set');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
  });
  logger.info('MongoDB connected');
}

module.exports = { connectDB };