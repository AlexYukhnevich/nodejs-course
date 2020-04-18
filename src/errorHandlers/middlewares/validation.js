const {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  getStatusText
} = require('http-status-codes');
const { ClientError, ServerError } = require('../errors');

const validateUser = (req, res, next) => {
  const { name, login, password } = req.body;
  return !name || !login || !password ? next(BAD_REQUEST) : next();
};

const validateTask = (req, res, next) => {
  const { title, description, order } = req.body;
  return !title || !description || !Number.isInteger(order)
    ? next(BAD_REQUEST)
    : next();
};

const validateBoard = (req, res, next) => {
  const { title, columns } = req.body;
  return !title || (!columns && !Array.isArray(columns))
    ? next(BAD_REQUEST)
    : next();
};

const validateRequest = (err, req, res, next) => {
  let error;
  switch (err) {
    case NOT_FOUND:
      error = new ClientError(NOT_FOUND, getStatusText);
      break;
    case BAD_REQUEST:
      error = new ClientError(BAD_REQUEST, getStatusText);
      break;
    default:
      error = new ServerError(INTERNAL_SERVER_ERROR, getStatusText);
      break;
  }
  next(error);
};

module.exports = {
  validateUser,
  validateTask,
  validateBoard,
  validateRequest
};
