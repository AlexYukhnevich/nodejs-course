const { UNAUTHORIZED } = require('http-status-codes');
const parseToken = require('../helpers/token.helper');
const loginService = require('../components/login/login.service');

const auth = async (req, res, next) => {
  const tokenFromRequest = req.headers.authorization;
  if (!tokenFromRequest) {
    return next(UNAUTHORIZED);
  }
  try {
    const token = parseToken(tokenFromRequest);
    loginService.checkToken(token);
  } catch (err) {
    return next(UNAUTHORIZED);
  }
  return next();
};

module.exports = auth;
