const dotenv = require('dotenv');

function loadConfig() {
  const result = dotenv.config();
  if (result.error && process.env.NODE_ENV !== 'production') {
    // Use console here to avoid any chance of circular import with logger
    console.warn('[WARN] .env file not found; relying on process env only');
  }
}

module.exports = { loadConfig };