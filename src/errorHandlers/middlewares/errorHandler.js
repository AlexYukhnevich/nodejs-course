const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { ValidationError, ClientError, ServerError } = require('../errors');

const errorHandler = (err, req, res, next) => {
  if (!(err instanceof ValidationError) && !(err instanceof ClientError)) {
    err = new ServerError(INTERNAL_SERVER_ERROR, getStatusText);
  }
  res.status(err.status).send(err.text);
  req.err = err;
  next();
};

module.exports = errorHandler;
