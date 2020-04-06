const BoardRepository = require('../boards/board.memory.repository');
const TaskRepository = require('./task.memory.repository');

class TaskService {
  async getAll(boardId) {
    const board = await BoardRepository.get(boardId);
    return board ? board.getTasks() : [];
  }

  async get(id) {
    return await TaskRepository.get(id);
  }

  async create(boardId, data) {
    const task = await TaskRepository.create(data);
    return task ? await BoardRepository.addTask(boardId, task) : undefined;
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
