const dotenv = require('dotenv');
const { logger } = require('../utils/logger');

function loadConfig() {
  const result = dotenv.config();
  if (result.error && process.env.NODE_ENV !== 'production') {
    logger.warn('.env file not found, relying on process env only');
  }
}

module.exports = { loadConfig };