const { loadConfig } = require('./config/env');
loadConfig(); // dotenv must be loaded as early as possible

const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');
const { logger } = require('./utils/logger');

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