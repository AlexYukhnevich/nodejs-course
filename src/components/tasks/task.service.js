const BoardRepository = require('../boards/board.memory.repository');
const TaskRepository = require('./task.memory.repository');

class TaskService {
  async getAll() {
    return await TaskRepository.getAll();
  }

  async get(id) {
    return await TaskRepository.get(id);
  }

  async create(boardId, data) {
    const task = await TaskRepository.create(boardId, data);
    return !task ? task : await BoardRepository.addTask(boardId, task);
  }

  async update(id, data) {
    return await TaskRepository.update(id, data);
  }

  async delete(id) {
    return await TaskRepository.delete(id);
  }
}

const taskService = new TaskService();
module.exports = taskService;
