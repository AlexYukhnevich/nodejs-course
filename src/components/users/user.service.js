const usersDBRepository = require('./users.db.repository');

class UserService {
  async getAll() {
    return await usersDBRepository.getAll();
  }

  async get(id) {
    return await usersDBRepository.get(id);
  }

  async create(data) {
    return await usersDBRepository.create(data);
  }

  async update(id, data) {
    return await usersDBRepository.update(id, data);
  }

  async delete(id) {
    return await usersDBRepository.delete(id);
  }
}

const userService = new UserService();
module.exports = userService;
