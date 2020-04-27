const { UNAUTHORIZED } = require('http-status-codes');
const { parseToken, checkToken } = require('../helpers/jwt.helper');
const { JWT_SECRET_KEY } = require('../common/config');

const auth = async (req, res, next) => {
  const tokenFromRequest = req.headers.authorization;
  if (!tokenFromRequest) {
    return next(UNAUTHORIZED);
  }
  try {
    const token = parseToken(tokenFromRequest);
    checkToken(token, JWT_SECRET_KEY);
  } catch (err) {
    return next(UNAUTHORIZED);
  }
  return next();
};

module.exports = auth;
