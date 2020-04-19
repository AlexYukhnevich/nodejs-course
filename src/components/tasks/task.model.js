const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.sendResponse = task => task;
const Task = model('Task', taskSchema);
// class Task {
//   constructor({
//     id = uuid(),
//     title = 'task',
//     order,
//     description = 'untitled',
//     userId,
//     boardId,
//     columnId
//   }) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }

//   static sendResponse(task) {
//     return task;
//   }
// }

module.exports = Task;
