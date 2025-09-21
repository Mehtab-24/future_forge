const logger = require('../utils/logger');

function notFoundHandler(req, res, next) {
  res.status(404).json({ message: 'Route not found' });
}

function errorHandler(err, req, res, next) {
  logger.error(err && (err.stack || err.message || err));
  const status = err.status || 500;
  const message = status === 500 ? 'Internal server error' : err.message;
  res.status(status).json({ message });
}

module.exports = { errorHandler, notFoundHandler };