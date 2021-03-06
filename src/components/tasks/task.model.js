const uuid = require('uuid');
const { Schema, model } = require('mongoose');

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

taskSchema.statics.sendResponse = ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
});

const Task = model('Task', taskSchema);

module.exports = Task;
