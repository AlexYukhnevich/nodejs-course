const userService = require('../users/user.service');
const { compareEntities } = require('../../helpers/bcrypt.helper');
const { getPayload, signToken } = require('../../helpers/jwt.helper');
const { JWT_SECRET_KEY } = require('../../common/config');

class AuthService {
  async getToken({ login, password }) {
    const user = await userService.checkLogin(login);
    if (user) {
      const passwordResult = await compareEntities(password, user.password);
      if (passwordResult) {
        return signToken(user, getPayload, JWT_SECRET_KEY);
      }
    }
    return null;
  }
}

module.exports = new AuthService();
