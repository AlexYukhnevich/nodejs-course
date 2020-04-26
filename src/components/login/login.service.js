const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const UsersDBRepository = require('../users/users.db.repository');
const { compareEntities } = require('../../helpers/bcrypt.helper');

class LoginService {
  async getToken({ login, password }) {
    const user = await UsersDBRepository.checkUser(login);
    if (user) {
      const passwordResult = await compareEntities(password, user.password);
      if (passwordResult) {
        return jwt.sign(this.getPayload(user), JWT_SECRET_KEY);
      }
    }
    return null;
  }

  getPayload({ login, id }) {
    return { login, userId: id };
  }

  checkToken(token) {
    return jwt.verify(token, JWT_SECRET_KEY);
  }
}

module.exports = new LoginService();
