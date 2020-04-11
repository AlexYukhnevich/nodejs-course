// eslint-disable-next-line node/no-deprecated-api
// const urlParse = require('url').parse;
const logger = require('./logger');

const loggerMiddleware = (req, res, next) => {
  if (req.err) {
    console.log('CATCHED');
    const { status, text } = req.err;
    const msg = status && text ? { status, text } : req.err;
    logger.log({ level: 'error', message: msg });
    return;
  }
  const { url, method, query, body } = req;
  // const isParams = Object.values(params);
  // const checkQuery = isParams.length
  //   ? isParams.join('')
  //   : urlParse(url).query;
  // const checkBody = body ? body : {};
  logger.log({
    level: 'info',
    message: { method, url, query, body }
  });
  next();
};

module.exports = loggerMiddleware;
