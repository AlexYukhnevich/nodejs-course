const titles = ['To Do', 'In Progres', 'Done'];

class Column {
  constructor({ id, title, order }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.tasks = [];
  }
}

module.exports = { Column, titles };
