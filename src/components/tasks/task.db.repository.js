const Task = require('./task.model');

class TaskDBRepository {
  static async getAll(boardId) {
    return await Task.find({ boardId });
  }

  static async get(id) {
    return await Task.findById(id);
  }

  static async create(boardId, data) {
    return await Task.create({ ...data, boardId });
  }

  static async update(id, data) {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await Task.findByIdAndDelete(id);
  }

  static async deleteTasks(boardId) {
    return await Task.deleteMany({ boardId });
  }

  static async unassignUser(userId) {
    return await Task.updateMany({ userId }, { userId: null });
  }
}

module.exports = TaskDBRepository;
