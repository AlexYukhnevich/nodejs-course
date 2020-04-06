/* eslint-disable node/no-unsupported-features/node-builtins */
const fs = require('fs').promises;
const path = require('path');
const usersDatabasePath = path.join(__dirname, 'users.database.json');
console.log(usersDatabasePath);

class UserService {
  async getAll() {
    const rawUsers = await fs.readFile(usersDatabasePath, 'utf-8');
    const users = rawUsers ? JSON.parse(rawUsers) : [];
    return users;
  }

  async getUser(id) {
    const rawUsers = await fs.readFile(usersDatabasePath, 'utf-8');
    const user = JSON.parse(rawUsers).find(u => u.id === id);
    return user;
  }

  async createUser(users, newUser) {
    users.push(newUser);
    await this.updateUserDatabase(users);
  }

  async updateUser(users, data) {
    const updateUsers = users.map(u => (u.id === data.id ? data : u));
    await this.updateUserDatabase(updateUsers);
  }

  async deleteUser(users, id) {
    const updateUsers = users.filter(u => u.id !== id);
    await this.updateUserDatabase(updateUsers);
  }

  async updateUserDatabase(updateDatabase) {
    await fs.writeFile(usersDatabasePath, JSON.stringify(updateDatabase));
  }
}

const userService = new UserService();
module.exports = userService;
