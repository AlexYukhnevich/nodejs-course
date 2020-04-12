const logger = require('./logger');

const loggerMiddleware = (req, res, next) => {
  const { err, url, method, query, body } = req;
  if (err) {
    const { status, text } = err;
    logger.log({ level: 'error', message: { status, text } });
    return;
  }
  logger.log({ level: 'info', message: { method, url, query, body } });
  next();
};

module.exports = loggerMiddleware;
