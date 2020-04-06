const fs = require('fs').promises;
const path = require('path');
const databasePath = path.join(__dirname, 'boards.database.json');
const Board = require('./board.model');

class BoardRepository {
  static async getAll() {
    const db = await fs.readFile(databasePath, 'utf-8');
    const boards = db ? JSON.parse(db).boards : 'undefined';
    return boards;
  }

  static async get(id) {
    const db = await fs.readFile(databasePath, 'utf-8');
    const boards = JSON.parse(db).boards;
    return Array.isArray(boards) ? boards.find(b => b.id === id) : 'undefined';
  }

  static async create(data) {
    const board = new Board(data);
    const boards = await this.getAll();
    const db = { boards: boards.concat(board) };
    await fs.writeFile(databasePath, JSON.stringify(db));
    return board ? board : undefined;
  }

  static async update(id, data) {
    let board = await this.get(id);
    const boards = await this.getAll();
    if (board) {
      board = { id, ...data };
      const db = { boards: boards.map(b => (b.id === board.id ? board : b)) };
      await fs.writeFile(databasePath, JSON.stringify(db));
    }
    return board;
  }

  static async delete(id) {
    const board = await this.get(id);
    if (board) {
      const boards = await this.getAll();
      const db = { boards: boards.filter(b => b.id !== board.id) };
      await fs.writeFile(databasePath, JSON.stringify(db));
    }
    return board;
  }

  static async addTask(boardId, task) {
    // const board = await this.get(boardId);
    // if (board) {
    //   board.addTask(task);
    //   const boards = await this.getAll();
    //   const db = { boards: boards.map(b => (b.id === board.id ? board : b)) };
    //   await fs.writeFile(databasePath, JSON.stringify(db));
    // }
    return task;
  }
}

module.exports = BoardRepository;
