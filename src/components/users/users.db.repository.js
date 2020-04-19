const User = require('./user.model');
// const users = require('../../db/db.client').users;

class UsersDBRepository {
  static async getAll() {
    return await User.find({});
  }

  static async get(id) {
    return await User.findById({ _id: id });
  }

  static async create(data) {
    return await User.create(data);
  }

  static async getUserByProps(props) {
    return await User.find(props);
  }

  static async update(id, data) {
    return await User.updateOne({ _id: id }, data);
  }

  static async delete(id) {
    return await User.deleteOne({ _id: id });
  }
}

module.exports = UsersDBRepository;
