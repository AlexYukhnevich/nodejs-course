const logger = require('../loggers/logger');

const errorHandlerMiddleware = (err, req, res, next) => {
  const { status, message } = err;
  res.status(status).send(message);
  logger.error({ status, message });
  next();
};

module.exports = errorHandlerMiddleware;
