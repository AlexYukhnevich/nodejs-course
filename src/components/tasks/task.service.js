const TaskDBRepository = require('./task.db.repository');

class TaskService {
  async getAll(boardId) {
    return await TaskDBRepository.getAll(boardId);
  }

  async get(id) {
    return await TaskDBRepository.get(id);
  }

  async create(boardId, data) {
    return await TaskDBRepository.create(boardId, data);
  }

  async update(id, data) {
    return await TaskDBRepository.update(id, data);
  }

  async delete(id) {
    return await TaskDBRepository.delete(id);
  }
}

const taskService = new TaskService();
module.exports = taskService;
