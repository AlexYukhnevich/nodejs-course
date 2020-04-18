const uuid = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'template_passw0rd'
  }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static sendResponse({ id, name, login }) {
    return { id, name, login };
  }
}

module.exports = User;
