const uuid = require('uuid');
const { Column, titles } = require('./column.model');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const boardSchema = new Schema(
  {
    title: String,
    columns: {
      type: Array,
      default: titles.map((t, idx) => new Column(idx + 1, t, idx))
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.sendResponse = ({ title, columns, id }) => ({
  title,
  columns,
  id
});

// boardSchema.methods.getTasks = function () {
//   return this.columns.reduce(
//     (acc, column) => (column.tasks.length ? [...acc, ...column.tasks] : acc),
//     []
//   );
// };

// boardSchema.methods.addTask = function (task) {
//   const column = task.columnId
//     ? this.columns.find(c => c.id === task.columnId) || this.columns[0]
//     : this.columns[0];

//   column.tasks = column.tasks ? [...column.tasks, task] : [task];

//   if (task.boardId !== this.id) {
//     task.boardId = this.id;
//   }
// };

const Board = model('Board', boardSchema);
// class Board {
//   constructor({
//     id = uuid(),
//     title = 'Board',
//     columns = titles.map((t, idx) => new Column(idx + 1, t, idx))
//   }) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }

//   static sendResponse(board) {
//     return board;
//   }

//   getTasks() {
//     return this.columns.reduce(
//       (acc, column) => (column.tasks.length ? [...acc, ...column.tasks] : acc),
//       []
//     );
//   }

//   addTask(task) {
//     const column = task.columnId
//       ? this.columns.find(c => c.id === task.columnId) || this.columns[0]
//       : this.columns[0];

//     column.tasks = column.tasks ? [...column.tasks, task] : [task];

//     if (task.boardId !== this.id) {
//       task.boardId = this.id;
//     }
//   }
// }

module.exports = Board;
