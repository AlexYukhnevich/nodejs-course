const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Created Schema
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

// Created Model
const User = model('User', userSchema);

// class User {
//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'template_passw0rd'
//   }) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }

//   static sendResponse({ id, name, login }) {
//     return { id, name, login };
//   }
// }

module.exports = User;
