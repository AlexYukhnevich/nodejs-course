const userRepository = require('./user.memory.repository');
// const TaskRepository = require('../tasks/task.memory.repository');

class UserService {
  async getAll() {
    return await userRepository.getAll();
  }

  async get(id) {
    return await userRepository.get(id);
  }

  async create(data) {
    return await userRepository.create(data);
  }

  async update(id, data) {
    return await userRepository.update(id, data);
  }

  async delete(id) {
    const user = await userRepository.delete(id);
    // if (user) {
    //   await TaskRepository.unassignUser(user.id);
    // }
    return user;
  }
}

const userService = new UserService();
module.exports = userService;
