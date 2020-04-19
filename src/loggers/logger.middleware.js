const logger = require('./logger');

const initialLoggerMiddleware = (req, res, next) => {
  const { method, url, query, body } = req;
  logger.log({
    level: 'info',
    message: { method, url, query, body }
  });
  next();
};

module.exports = initialLoggerMiddleware;
