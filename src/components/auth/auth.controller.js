const { FORBIDDEN } = require('http-status-codes');
const authService = require('./auth.service');
const catchError = require('../../middlewares/catch-error.middleware');

const checkLogin = catchError(async (req, res, next) => {
  const token = await authService.getToken(req.body);
  if (!token) {
    return next(FORBIDDEN);
  }
  res.send({ token });
});

module.exports = { checkLogin };
