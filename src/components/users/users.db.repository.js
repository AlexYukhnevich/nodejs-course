const User = require('./user.model');

class UsersDBRepository {
  static async getAll() {
    return await User.find();
  }

  static async get(id) {
    return await User.findById(id);
  }

  static async checkLogin(login) {
    return await User.findOne({ login });
  }

  static async create(data) {
    return await User.create(data);
  }

  static async update(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await User.findOneAndDelete(id);
  }
}

module.exports = UsersDBRepository;
