const mongoose = require('mongoose');
const { logger } = require('../utils/logger');

async function connectDB(uri) {
  if (!uri) throw new Error('MONGODB_URI is not set');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  logger.info('MongoDB connected');
}

module.exports = { connectDB };