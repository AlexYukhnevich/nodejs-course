// const userRepository = require('./user.memory.repository');
const TaskRepository = require('../tasks/task.memory.repository');
const usersDBRepository = require('./users.db.repository');

class UserService {
  async getAll() {
    return await usersDBRepository.getAll();
    // return await userRepository.getAll();
  }

  async get(id) {
    return await usersDBRepository.get(id);
    // return await userRepository.get(id);
  }

  async create(data) {
    return await usersDBRepository.create(data);
    // return await userRepository.create(data);
  }

  async update(id, data) {
    return await usersDBRepository.update(id, data);
    // return await userRepository.update(id, data);
  }

  async delete(id) {
    const user = await usersDBRepository.delete(id);
    // const user = await userRepository.delete(id);
    if (user) {
      await TaskRepository.unassignUser(user.id);
    }
    return user;
  }
}

const userService = new UserService();
module.exports = userService;
