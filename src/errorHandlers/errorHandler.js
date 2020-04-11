const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const ValidationError = require('./validationError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.status).send(err.text);
  } else {
    err = Object.assign({
      err,
      status: INTERNAL_SERVER_ERROR,
      text: getStatusText(INTERNAL_SERVER_ERROR)
    });
    res.status(err.status).send(err.text);
  }
  console.log(err);
  req.err = err;
  next();
};

module.exports = errorHandler;
