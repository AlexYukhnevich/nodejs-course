const uuid = require('uuid');

class Board {
  constructor({ id = uuid.v4(), title = 'Title', columns = null }) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
  static sendResponse(board) {
    return {
      message: 'Success',
      board
    };
  }
}

module.exports = Board;
