const Board = require('./board.model');
const TaskDBRepository = require('../tasks/task.db.repository');

class BoardDBRepository {
  static async getAll() {
    return await Board.find();
  }

  static async get(id) {
    return await Board.findById(id);
  }

  static async create(data) {
    return await Board.create(data);
  }

  static async update(id, data) {
    return await Board.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    const board = Board.findByIdAndDelete(id);
    if (board) {
      await TaskDBRepository.deleteTasks(id);
    }
    return board;
  }
}

module.exports = BoardDBRepository;
