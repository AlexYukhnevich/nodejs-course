const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const columnSchema = new Schema({
  title: String,
  order: Number,
  _id: {
    type: String,
    default: uuid
  }
});

const boardSchema = new Schema(
  {
    title: String,
    columns: [columnSchema],
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

const Board = model('Board', boardSchema);

module.exports = Board;
