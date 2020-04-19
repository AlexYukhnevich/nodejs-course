const User = require('./user.model');
const TaskDBRepository = require('../tasks/task.db.repository');

class UsersDBRepository {
  static async getAll() {
    return await User.find();
  }

  static async get(id) {
    return await User.findById(id);
  }

  static async create(data) {
    return await User.create(data);
  }

  static async update(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    const user = await User.findOneAndDelete(id);
    if (user) {
      await TaskDBRepository.unassignUser(id);
    }
    return user;
  }
}

module.exports = UsersDBRepository;
