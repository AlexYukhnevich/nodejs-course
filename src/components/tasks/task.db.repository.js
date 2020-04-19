const Task = require('./task.model');

class TaskDBRepository {
  static async getAll() {
    return await Task.find({});
  }

  static async get(id) {
    return await Task.findById({ _id: id });
  }

  static async create(boardId, data) {
    return await Task.create({ _id: boardId }, data);
  }

  static async getBoardByProps(props) {
    return await Task.find(props);
  }

  static async update(id, data) {
    return await Task.updateOne({ _id: id }, data);
  }

  static async delete(id) {
    return await Task.deleteOne({ _id: id });
  }

  //   static async unassignUser(userId) {
  //     const userTasks = await Task.find({ id: userId });
  //     userTasks.forEach(task => (task.userId = null));
  //     return userTasks;
  //   }
}

// eslint-disable-next-line prettier/prettier
module.exports = TaskDBRepository;
