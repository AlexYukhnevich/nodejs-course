const fs = require('fs').promises;
const path = require('path');
const databasePath = path.join(__dirname, 'users.database.json');
const User = require('./user.model');

class UserRepository {
  static async getAll() {
    const db = await fs.readFile(databasePath, 'utf-8');
    return db ? JSON.parse(db) : db;
  }

  static async get(id) {
    const db = await fs.readFile(databasePath, 'utf-8');
    const users = JSON.parse(db);
    return Array.isArray(users) ? users.find(u => u.id === id) : users;
  }

  static async create(data) {
    const user = new User(data);
    const users = await this.getAll();
    const db = Array.isArray(users) ? [...users, user] : [user];
    await fs.writeFile(databasePath, JSON.stringify(db));
    return user;
  }

  static async update(id, data) {
    let user = await this.get(id);
    const users = await this.getAll();
    if (user) {
      user = { id, ...data };
      const db = Array.isArray(users)
        ? users.map(u => (u.id === user.id ? user : u))
        : [user];
      await fs.writeFile(databasePath, JSON.stringify(db));
    }
    return user;
  }

  static async delete(id) {
    const user = await this.get(id);
    if (user) {
      const users = await this.getAll();
      const db = Array.isArray(users)
        ? users.filter(u => u.id !== user.id)
        : [user];
      await fs.writeFile(databasePath, JSON.stringify(db));
    }
    return user;
  }
}

module.exports = UserRepository;
