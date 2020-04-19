const Board = require('./board.model');

class BoardDBRepository {
  static async getAll() {
    return await Board.find({});
  }

  static async get(id) {
    return await Board.findById({ _id: id });
  }

  static async create(data) {
    return await Board.create(data);
  }

  static async getBoardByProps(props) {
    return await Board.find(props);
  }

  static async update(id, data) {
    return await Board.findOneAndUpdate({ _id: id }, data, {
      new: true
    }).exec();
    // return await Board.updateOne({ _id: id }, data);
  }

  static async delete(id) {
    return await Board.deleteOne({ _id: id });
  }
}

module.exports = BoardDBRepository;
