const BoardRepository = require('./board.memory.repository');
const TaskRepository = require('../tasks/task.memory.repository');

class BoardService {
  async getAll() {
    return await BoardRepository.getAll();
  }

  async get(id) {
    return await BoardRepository.get(id);
  }

  async create(data) {
    return await BoardRepository.create(data);
  }

  async update(id, data) {
    return await BoardRepository.update(id, data);
  }

  async delete(id) {
    const board = await BoardRepository.delete(id);
    if (board) {
      const tasksIds =
        Object.prototype.toString
          .call(board)
          .slice(8, -1)
          .toLowerCase() === 'object' && typeof board.getTasks === 'function'
          ? board.getTasks().map(task => task.id)
          : [];
      tasksIds.forEach(async taskId => await TaskRepository.delete(taskId));
    }
    return board;
  }
}

const boardService = new BoardService();
module.exports = boardService;
