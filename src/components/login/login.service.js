const UsersDBRepository = require('../users/users.db.repository');
const { compareEntities } = require('../../helpers/bcrypt.helper');
const { getPayload, signToken } = require('../../helpers/jwt.helper');
const { JWT_SECRET_KEY } = require('../../common/config');

class LoginService {
  async getToken({ login, password }) {
    const user = await UsersDBRepository.checkUser(login);
    if (user) {
      const passwordResult = await compareEntities(password, user.password);
      if (passwordResult) {
        return signToken(user, getPayload, JWT_SECRET_KEY);
      }
    }
    return null;
  }
}

module.exports = new LoginService();
