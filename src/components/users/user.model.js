const uuid = require('uuid');

class User {
  constructor({
    id = uuid.v4(),
    name = 'User',
    login = 'user_1',
    password = 'template_passw0rd'
  }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static sendResponse(user) {
    const response = Object.assign({}, user);
    delete response.password;
    return {
      message: 'Success',
      user: response
    };
  }
}

module.exports = User;
