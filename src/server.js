const { loadConfig } = require('./config/env');
loadConfig();

const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');
const logger = require('./utils/logger'); // CHANGED: default import

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
})();