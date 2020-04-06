/* eslint-disable node/no-unsupported-features/node-builtins */
const fs = require('fs').promises;
const path = require('path');
const boardsDatabasePath = path.join(__dirname, 'boards.database.json');
console.log(boardsDatabasePath);

class BoardService {
  async getAll() {
    const rawBoards = await fs.readFile(boardsDatabasePath, 'utf-8');
    const boards = rawBoards ? JSON.parse(rawBoards) : [];
    return boards;
  }

  async getBoard(id) {
    const rawBoards = await fs.readFile(boardsDatabasePath, 'utf-8');
    const board = JSON.parse(rawBoards).find(b => b.id === id);
    return board;
  }

  async createBoard(boards, newBoard) {
    boards.push(newBoard);
    await this.updateBoardsDatabase(boards);
  }

  async updateBoard(boards, data) {
    const updateBoards = boards.map(b => (b.id === data.id ? data : b));
    await this.updateBoardsDatabase(updateBoards);
  }

  async deleteBoard(boards, id) {
    const updateBoards = boards.filter(b => b.id !== id);
    await this.updateBoardsDatabase(updateBoards);
  }

  async updateBoardsDatabase(updateDatabase) {
    await fs.writeFile(boardsDatabasePath, JSON.stringify(updateDatabase));
  }
}

const boardService = new BoardService();
module.exports = boardService;
