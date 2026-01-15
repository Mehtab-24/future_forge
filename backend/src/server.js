const { loadConfig } = require('./config/env');
loadConfig();

// Set database availability flag based on connection success
process.env.DB_AVAILABLE = 'false';

const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');
const logger = require('./utils/logger'); // CHANGED: default import

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Try to connect to database, but continue without it if connection fails
    try {
      await connectDB(process.env.MONGODB_URI);
      logger.info('Database connected successfully');
      process.env.DB_AVAILABLE = 'true';
    } catch (dbError) {
      logger.warn('Database connection failed, continuing without database:', dbError.message);
      logger.warn('Note: Some features may not work without database connection');
      process.env.DB_AVAILABLE = 'false';
    }
    
    const server = http.createServer(app);

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        const newPort = PORT + 1;
        logger.warn(`Port ${PORT} is busy, trying ${newPort}...`);
        server.listen(newPort, () => {
          logger.info(`Server running on http://localhost:${newPort} (env: ${process.env.NODE_ENV || 'development'})`);
        });
      } else {
        logger.error('Server error:', err);
        process.exit(1);
      }
    });

    server.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
})();