const logger = require('./logger');
const RESPONSE = 'Response';
const REQUEST = 'Request';
let urlCached;

// eslint-disable-next-line no-unused-vars
const errorLoggerMiddleware = (req, res) => {
  const {
    method,
    err: { status, text }
  } = req;
  logger.log({
    level: 'error',
    message: { type: RESPONSE, method, url: urlCached, status, text }
  });
};

const responseLoggerMiddleware = (req, res) => {
  const { method, url } = req;
  const { payload, info } = res;
  logger.log({
    level: 'info',
    message: { type: RESPONSE, method, url, status: info, payload }
  });
};

const initialLoggerMiddleware = (req, res, next) => {
  const { method, url, query, body } = req;
  urlCached = url;
  logger.log({
    level: 'info',
    message: { type: REQUEST, method, url, query, body }
  });
  next();
};

module.exports = {
  errorLoggerMiddleware,
  responseLoggerMiddleware,
  initialLoggerMiddleware
};
