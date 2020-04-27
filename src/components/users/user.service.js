const UsersDBRepository = require('./users.db.repository');
const TaskService = require('../tasks/task.service');
const { getHashedEntity } = require('../../helpers/bcrypt.helper');
const SALT_ROUNDS = 10;

class UserService {
  async getAll() {
    return await UsersDBRepository.getAll();
  }

  async get(id) {
    return await UsersDBRepository.get(id);
  }

  async checkLogin(login) {
    return await UsersDBRepository.checkLogin(login);
  }

  async create({ name, login, password }) {
    const hashedPassword = await getHashedEntity(password, SALT_ROUNDS);
    return await UsersDBRepository.create({
      name,
      login,
      password: hashedPassword
    });
  }

  async update(id, data) {
    return await UsersDBRepository.update(id, data);
  }

  async delete(id) {
    const user = await UsersDBRepository.delete(id);
    if (user) {
      await TaskService.unassignUser(id);
    }
    return user;
  }
}

module.exports = new UserService();
