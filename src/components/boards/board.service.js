const BoardDBRepository = require('./board.db.repository');

class BoardService {
  async getAll() {
    return await BoardDBRepository.getAll();
  }

  async get(id) {
    return await BoardDBRepository.get(id);
  }

  async create(data) {
    return await BoardDBRepository.create(data);
  }

  async update(id, data) {
    return await BoardDBRepository.update(id, data);
  }

  async delete(id) {
    return await BoardDBRepository.delete(id);
  }
}

const boardService = new BoardService();
module.exports = boardService;
