const {
  NOT_FOUND,
  OK,
  NO_CONTENT,
  BAD_REQUEST,
  getStatusText
} = require('http-status-codes');
const { ValidationError, ClientError } = require('../errors');

const validateUser = (req, res, next) => {
  const { name, login, password } = req.body;
  if (!name || !login || !password) {
    throw new ValidationError(BAD_REQUEST, getStatusText);
  }
  next();
};

const validateTask = (req, res, next) => {
  const { title, description, order } = req.body;
  if (!title || !description || !Number.isInteger(order)) {
    throw new ValidationError(BAD_REQUEST, getStatusText);
  }
  next();
};

const validateBoard = (req, res, next) => {
  const { title, columns } = req.body;
  if (!title || (!columns && !Array.isArray(columns))) {
    throw new ValidationError(BAD_REQUEST, getStatusText);
  }
  next();
};

const validateClientRequest = (req, res, next) => {
  switch (res.info) {
    case NOT_FOUND:
      throw new ClientError(NOT_FOUND, getStatusText);
    case OK:
      res.status(OK).json(res.payload);
      break;
    case NO_CONTENT:
      res.status(NO_CONTENT).json(res.payload);
      break;
    default:
      break;
  }
  next();
};

module.exports = {
  validateUser,
  validateTask,
  validateBoard,
  validateClientRequest
};
