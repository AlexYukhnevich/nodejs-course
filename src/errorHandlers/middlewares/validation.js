const { NOT_FOUND, BAD_REQUEST, getStatusText } = require('http-status-codes');
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

const validateClientRequest = (err, req, res, next) => {
  if (err === NOT_FOUND) {
    throw new ClientError(NOT_FOUND, getStatusText);
  }
  next();
};

module.exports = {
  validateUser,
  validateTask,
  validateBoard,
  validateClientRequest
};
