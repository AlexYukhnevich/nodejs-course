const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'task',
    order = 0,
    description = 'untitled',
    userId,
    boardId,
    columnId
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
  static sendResponse(task) {
    return {
      message: 'Success',
      task
    };
  }
}

module.exports = Task;
