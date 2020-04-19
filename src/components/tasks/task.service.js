// const BoardRepository = require('../boards/board.memory.repository');
// const TaskRepository = require('./task.memory.repository');
const BoardDBRepository = require('../boards/board.db.repository');
const TaskDBRepository = require('./task.db.repository');

class TaskService {
  async getAll() {
    // return await TaskRepository.getAll();
    return await TaskDBRepository.getAll;
  }

  async get(id) {
    // return await TaskRepository.get(id);
    return await TaskDBRepository.get(id);
  }

  async create(boardId, data) {
    // const task = await TaskRepository.create(boardId, data);
    // return !task ? task : await BoardRepository.addTask(boardId, task);
    const task = await TaskDBRepository.create(boardId, data);
    return !task ? task : await BoardDBRepository.addTask(boardId, task);
  }

  async update(id, data) {
    // return await TaskRepository.update(id, data);
    return await TaskDBRepository.update(id, data);
  }

  async delete(id) {
    // return await TaskRepository.delete(id);
    return await TaskDBRepository.delete(id);
  }
}

const taskService = new TaskService();
module.exports = taskService;
