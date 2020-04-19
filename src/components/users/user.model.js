const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.statics.sendResponse = ({ id, name, login }) => ({
  id,
  name,
  login
});

const User = model('User', userSchema);

module.exports = User;
