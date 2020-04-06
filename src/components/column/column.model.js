const uuid = require('uuid');

class Column {
  constructor({ id = uuid.v4(), title = 'column', order = null }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
