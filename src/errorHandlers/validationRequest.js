const { BAD_REQUEST, getStatusText } = require('http-status-codes');
const ValidationError = require('./validationError');

class ValidationRequest {
  constructor(error) {
    this.error = error;
    this.validateUser = this.validateUser.bind(this);
    this.validateBoard = this.validateBoard.bind(this);
    this.validateTask = this.validateTask.bind(this);
  }

  validateUser(req, res, next) {
    const { name, login, password } = req.body;
    if (!name || !login || !password) {
      throw this.error;
    }
    next();
  }

  validateTask(req, res, next) {
    const { title, description, order } = req.body;
    if (!title || !description || !Number.isInteger(order)) {
      throw this.error;
    }
    next();
  }

  validateBoard(req, res, next) {
    const { title, columns } = req.body;
    if (!title || (!columns && !Array.isArray(columns))) {
      throw this.error;
    }
    next();
  }
}

const validationRequest = new ValidationRequest(
  new ValidationError(BAD_REQUEST, getStatusText)
);

module.exports = validationRequest;
