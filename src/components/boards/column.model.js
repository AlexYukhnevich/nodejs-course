const titles = ['To Do', 'In Progres', 'Done'];
const uuid = require('uuid');

class Column {
  constructor(id = uuid(), title, order) {
    this._id = id;
    this.title = title;
    this.order = order;
    this.tasks = [];
  }
}

module.exports = { Column, titles };
